using tt_backend.Data;
using tt_backend.Repository.AdRepo;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>();

//Services
builder.Services.AddScoped<IAdRepository, AdRepository>();  

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(corsPolicyBuilder =>
{
    corsPolicyBuilder
        .WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader();
    
});

ApplyMigrations();

app.Run();

void ApplyMigrations(){
    Console.WriteLine("Applying migrations");
    var webHost = new WebHostBuilder()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseStartup<ConsoleStartup>()
        .Build();
    using (var context = (DatabaseContext) webHost.Services.GetService(typeof(DatabaseContext)))
    {
        context.Database.Migrate();
    }
    Console.WriteLine("Done");
}
}