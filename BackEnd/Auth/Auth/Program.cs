using Auth.Data;
using Auth.Models;
using Auth.Service;
using Auth.Service.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Auth
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AppDbcontext>(option =>
            {
                string? connectionString = builder.Configuration.GetConnectionString("MysqlLocal");
                option.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            });

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AppDbcontext>()
                .AddDefaultTokenProviders();

            builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("AuthSettings:JwtOptions"));

            builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            builder.Services.AddScoped<IAuth, AuthService>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                        builder =>
                        {
                            builder.WithOrigins("*")
                                    .AllowAnyMethod()
                                    .AllowAnyHeader();
                        });
            });

            WebApplication app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(MyAllowSpecificOrigins);

            app.MapControllers();

            app.Run();
        }
    }
}