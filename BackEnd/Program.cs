global using BackEnd.Models;
using BackEnd;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TrillenceContext>();
builder.Services.AddScoped<IEmailInterface, EmailService>();
builder.Services.AddScoped<IAlbumInterface, AlbumService>();
builder.Services.AddScoped<IArtistAlbumInterface, ArtistAlbumService>();
builder.Services.AddScoped<IArtistInterface, ArtistService>();
builder.Services.AddScoped<IArtistSongInterface, ArtistSongService>();
builder.Services.AddScoped<IPlaylistInterface, PlaylistService>();
builder.Services.AddScoped<IPlaylistsongInterface, PlaylistsongService>();
builder.Services.AddScoped<ISongInterface, SongService>();
builder.Services.AddScoped<IUserInterface, UserService>();
builder.Services.AddScoped<Mp3MetadataReader>();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
            builder =>
            {
                builder.WithOrigins("*")
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
            });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();