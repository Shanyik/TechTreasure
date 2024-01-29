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

    public DbSet<Ad> Ads { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Ad>()
            .HasData(
                new Ad {Id = 1, Name = "CPU", Description = "Very good cpu"},
                new Ad {Id = 2, Name = "GPU", Description = "Decent gpu"},
                new Ad {Id = 3, Name = "RAM", Description = "Broken ram"}
            );
        
        base.OnModelCreating(builder);
    }

}