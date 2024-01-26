using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using tt_backend.Model;

namespace tt_backend.Data;

public class AppDbContext : IdentityDbContext
{
    protected readonly IConfiguration Configuration;

    public AppDbContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to postgres with connection string from app settings
        options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
        Console.WriteLine(Configuration.GetConnectionString("WebApiDatabase"));
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