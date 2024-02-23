using System.Security.Claims;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using tt_backend.Model;
using tt_backend.Repository.AdRepo;

namespace tt_backend.Controller;

[ApiController]
[Route("api/[controller]")]

public class AdController : ControllerBase
{
    private readonly IAdRepository _adRepository;
    private readonly UserManager<AppUser> _userManager;
    private readonly Cloudinary _cloudinary;

    public AdController(IAdRepository adRepository, UserManager<AppUser> userManager)
    {
        
        Account account = new Account(
            "dcfbxzvwo",
            "887462236519526",
            "hrpQYl4KG1w19Lg6x6slH2pmlS4");
        
        _cloudinary = new Cloudinary(account);
        
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

    [HttpPost("Create"), Authorize]
    public async Task<IActionResult> Create([FromForm] AdCreateModel adData)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Something is wrong with the ad!");
        }

        try
        {
            var imageUrls = new List<string>();

            foreach (var file in adData.Images)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream)
                    };
                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    imageUrls.Add(uploadResult.SecureUri.AbsoluteUri);
                }
            }
            
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

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