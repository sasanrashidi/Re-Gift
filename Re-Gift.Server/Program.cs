using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.IService;
using Re_Gift.Server.Services;
using Re_Gift.Server.Helpers;
using Re_Gift.Server.SeedData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddTransient<Seed>();
builder.Services.AddTransient<CleanUpData>();

var app = builder.Build();

await AddHelperMethod(app.Services, args);



app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


async Task AddHelperMethod(IServiceProvider services, string[] args)
{
    // Check if "seed" argument is passed
    if (args.Contains("seed"))
    {
        using (var scope = services.CreateScope())
        {
            var seeder = scope.ServiceProvider.GetRequiredService<Seed>();
            await seeder.SeedDatabaseAsync();
        }
        return; // Exit the application after seeding
    }

    // Check if "CleanUpDb" argument is passed
    if (args.Contains("CleanUpDb"))
    {
        using (var scope = services.CreateScope())
        {
            var cleaner = scope.ServiceProvider.GetRequiredService<CleanUpData>();
            await cleaner.CleanAllDataAsync(); // Assuming CleanAllDataAsync is the method that cleans up the database
        }
        return; // Exit the application after cleaning
    }
}


