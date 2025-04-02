using Microsoft.EntityFrameworkCore;
using Mission11Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookstoreDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

builder.Services.AddCors(options => 
    options.AddPolicy("DisPolicy", 
    policy => {
        policy.WithOrigins("http://localhost:3002", "https://salmon-bay-0bbe3f81e.6.azurestaticapps.net").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("DisPolicy");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
