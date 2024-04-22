global using BackEnd.Models;
global using BackEnd.Repositories.Interfaces;
global using BackEnd.Repositories.Services;
using BackEnd;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

string musicFolderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
string[] musicFiles = Directory.GetFiles(musicFolderPath, "*.mp3");
builder.Services.AddSingleton(musicFiles);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TrillenceContext>();
builder.Services.AddMemoryCache();
builder.Services.AddScoped<IAlbumInterface, AlbumService>();
builder.Services.AddScoped<IArtistInterface, ArtistService>();
builder.Services.AddScoped<IArtistSongInterface, ArtistSongService>();
builder.Services.AddScoped<IPlaylistInterface, PlaylistService>();
builder.Services.AddScoped<IPlaylistsongInterface, PlaylistsongService>();
builder.Services.AddScoped<ISongInterface, SongService>();
builder.Services.AddScoped<IUserInterface, UserService>();
builder.Services.AddScoped<IConnectionInterface, ConnectionService>();
builder.Services.AddScoped<IVerificationInterface, VerificationService>();
builder.Services.AddScoped<AudioMetadataReader>();
builder.Services.AddScoped<IMusicStreamingInterface, MusicStreamingService>();
builder.Services.AddScoped<IAlbumImageInterface, AlbumImageService>();

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

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();