using System.Security.Claims;
using System.Text;
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
    private readonly HttpClient _client;
    private readonly IConfiguration _configuration;
    private readonly string? _cloudImageLink;
    public AdController(IAdRepository adRepository, UserManager<AppUser> userManager, HttpClient client, IConfiguration configuration)
    {

        _configuration = configuration;
        _adRepository = adRepository;
        _userManager = userManager;
        _client = client;
        _cloudImageLink = configuration.GetValue<string>("ConnectionStrings:CloudImageLink");
        
        _client.DefaultRequestHeaders.Add("ApiKey",configuration.GetValue<string>("ConnectionStrings:CloudImageApiKey"));
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
    
    [HttpGet("StatusCheckForCloudImage")]
    public async Task<IActionResult> StatusCheckForCloudImage()
    {
        Console.WriteLine(_cloudImageLink);
        var response = await _client.GetAsync(_cloudImageLink + "/Image/StatusCheck");
        return Ok(response.Content.ReadAsStringAsync());
    }
    
    [HttpGet("GetById")]
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
    
    public class AdCreateModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string Condition { get; set; }
        public List<IFormFile> Images { get; set; }
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
            
            var form = new MultipartFormDataContent();
            
            foreach (var imageFile in adData.Images)
            {
                var stream = imageFile.OpenReadStream();
                var imageContent = new StreamContent(stream);
                
                imageContent.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("form-data")
                {
                    Name = "images",
                    FileName = imageFile.FileName
                };
                imageContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(imageFile.ContentType);
                
                form.Add(imageContent);
            }
            
            var response = await _client.PostAsync(_cloudImageLink + "/Image/upload", form);
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
    
    [HttpPost("Delete")]
    public async Task<IActionResult> DeleteAd(int adId)
    {
        try
        {
            var ad = await _adRepository.GetById(adId);
            if (ad == null)
            {
                return NotFound("Ad not found!");
            }
            
            var imageUrls = ad.Images.Select(img => img.ImageUrl).ToList();
            
            var content = new StringContent(JsonConvert.SerializeObject(imageUrls), Encoding.UTF8, "application/json");
            
            var response = await _client.PostAsync(_cloudImageLink + "/Image/delete", content);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to upload image to CloudImage API");
            }
            
            await _adRepository.Delete(ad);
            return Ok("Ad deleted successfully!");
        }
        catch (Exception e)
        {
            return BadRequest($"Error deleting ad! {e.Message}");
        }
    }
}