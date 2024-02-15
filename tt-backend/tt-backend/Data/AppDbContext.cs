using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using tt_backend.Model;

namespace tt_backend.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    
    public IQueryable<AppUser> GetAppUserByEmail(string email)
    {
        return Users.Where(u => u.Email == email);
    }

    public DbSet<Ad> Ads { get; set; }
    public DbSet<AdImage> AdImages{ get; set; }
    public DbSet<Review> Reviews { get; set; }

    public void SeedData()
    {
        Seed.SeedData(this);
    }
    
}