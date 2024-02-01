using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    
    [HttpGet("GetAll"), Authorize]
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
}