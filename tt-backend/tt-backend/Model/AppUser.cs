using Microsoft.AspNetCore.Identity;

namespace tt_backend.Model;

public class AppUser : IdentityUser
{
    public List<Ad> AdsPosted { get; set; }
    public List<Review> ReviewsReceived { get; set; }
}