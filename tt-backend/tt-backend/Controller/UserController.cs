using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using tt_backend.Model;

namespace tt_backend.Controller;

[Route("api/[controller]")]
[ApiController]

public class UserController : ControllerBase
{
    private readonly UserManager<AppUser> userManager;
    private readonly SignInManager<AppUser> signInManager;

    public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
    }
    
    [HttpPost("add-user")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var user = new AppUser()
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email,
            Address = model.Address,
            UserName = model.UserName,
            PasswordHash = model.Password,
        };
        var result = await userManager.CreateAsync(user, user.PasswordHash!);
        if (result.Succeeded)
            return Ok("Registration made successfully");
            
        return BadRequest("Error occured");
    }
}