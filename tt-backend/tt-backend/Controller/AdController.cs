using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using tt_backend.Model;
using tt_backend.Repository.AdRepo;

namespace tt_backend.Controller;

[ApiController]
[Route("api/[controller]")]

public class AdController : ControllerBase
{
    private readonly IAdRepository _adRepository;
    private readonly UserManager<AppUser> _userManager;

    public AdController(IAdRepository adRepository, UserManager<AppUser> userManager)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionStrings = configuration.GetSection("Cloudinary").GetChildren()
            .ToDictionary(c => c.Key, c => c.Value);
        
        _adRepository = adRepository;
        _userManager = userManager;
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var ads = await _adRepository.GetAll();
            if (!ads.Any())
            {
                return NotFound();
            }

            return Ok(ads);
        }
        catch (Exception e)
        {
            return BadRequest("not found");
        }
    }
    
    public class AdCreateModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string Condition { get; set; }
        public List<IFormFile> Images { get; set; }
    }

    [HttpGet("StatusCheck")]
    public async Task<IActionResult> StatusCheck()
    {
        using var client = new HttpClient();
        var response = await client.GetAsync("http://localhost:5246/Image/StatusCheck");
        return Ok(response.Content.ReadAsStringAsync());
    }
    
    [HttpPost("Create"), Authorize]
    public async Task<IActionResult> Create(AdCreateModel adData)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Something is wrong with the ad!");
        }

        try
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);
            List<string>? imageUrls;

            // Create a multipart form data content
            var form = new MultipartFormDataContent();
            
            // Add each image file to the form
            foreach (var imageFile in adData.Images)
            {
                var stream = imageFile.OpenReadStream();
                var imageContent = new StreamContent(stream);

                // Add content disposition with the name "images" and the file name
                imageContent.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("form-data")
                {
                    Name = "images",
                    FileName = imageFile.FileName
                };

                // Add content type if needed
                imageContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(imageFile.ContentType);

                // Add image content to the form
                form.Add(imageContent);
            }

            // Send the request to CloudImage API
            var client = new HttpClient();
            
            var response = await client.PostAsync("http://localhost:5246/Image/upload", form);
            if (response.IsSuccessStatusCode)
            {
                var imageUrlJson = await response.Content.ReadAsStringAsync();
                imageUrls = JsonConvert.DeserializeObject<List<string>>(imageUrlJson);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to upload image to CloudImage API");
            }
            

            var ad = new Ad
            {
                Name = adData.Name,
                Description = adData.Description,
                Price = adData.Price,
                Category = adData.Category,
                Condition = adData.Condition,
                DatePosted = DateTime.UtcNow,
                Sold = false,
                Seller = user,
                Images = imageUrls.Select(url => new AdImage { ImageUrl = url }).ToList()
            };

            await _adRepository.Create(ad);
            return Ok("Ad created successfully!");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("GetById:{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var ad = await _adRepository.GetById(id);

            if (ad == null)
            {
                return NotFound("Ad not found in database.");
            }

            return Ok(ad);
        }
        catch (Exception e)
        {
            return BadRequest("Error connecting to the database! Try again later!");
        }
    }

    [HttpGet("GetAllByUserId")]
    public async Task<IActionResult> GetAllByUserId(string id)
    {
        try
        {
            var ads = await _adRepository.GetAllByUserId(id);
            if (!ads.Any())
            {
                return NotFound("No ads found with this user!");
            }

            return Ok(ads);
        }
        catch (Exception e)
        {
            return BadRequest("Error connecting to the database! Try again later!");
        }
    }
}