using Microsoft.AspNetCore.Identity;

namespace tt_backend.Model;

public class AppUser : IdentityUser
{
    public string Address { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public List<Review> ReviewsReceived { get; set; }
}