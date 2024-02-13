using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tt_backend.Model;
using tt_backend.Repository.AdRepo;

namespace tt_backend.Controller;

[ApiController]
[Route("api/[controller]")]

public class AdController : ControllerBase
{
    private readonly IAdRepository _adRepository;

    public AdController(IAdRepository adRepository)
    {
        _adRepository = adRepository;
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

    [HttpPost("Create"), Authorize]
    public async Task<IActionResult> Create(Ad ad)
    {
        if (ad == null)
        {
            return BadRequest("Something is wrong with the ad!");
        }

        try
        {
            await _adRepository.Create(ad);
            return Ok("Added successfully!");
        }
        catch (Exception e)
        {
            return BadRequest("Error connecting to the database! Try again later!");
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