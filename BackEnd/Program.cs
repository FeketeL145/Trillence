global using BackEnd.Models;
global using BackEnd.Repositories.Interfaces;
global using BackEnd.Repositories.Services;
using BackEnd;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TrillenceContext>();
//builder.Services.AddScoped<IEmailInterface, EmailService>();
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


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
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

var app = builder.Build();

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