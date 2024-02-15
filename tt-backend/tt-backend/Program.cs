using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using tt_backend.Data;
using tt_backend.Model;
using tt_backend.Repository.AdRepo;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("WebApiDatabase")));

//Auth

builder.Services.AddAuthorization();

builder.Services
    .AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<AppDbContext>();

//Services
builder.Services.AddScoped<IAdRepository, AdRepository>();  

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();

    // Seed data when the application starts
    context.SeedData();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Auth

app.MapGroup("/api/account").MapIdentityApi<AppUser>();

app.MapPost("/api/account/logout", async (SignInManager<AppUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/api/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new { Email = email});
}).RequireAuthorization();

app.MapGet("/api/user", async (AppDbContext dbContext, ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    
    var userData = await dbContext.GetAppUserByEmail(email).ToListAsync();

    if (userData == null || !userData.Any())
    {
        return Results.NotFound();
    }
    
    return Results.Json(userData);
}).RequireAuthorization();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(corsPolicyBuilder =>
{
    corsPolicyBuilder
        .WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();

});


app.Run();