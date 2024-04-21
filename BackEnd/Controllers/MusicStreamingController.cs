using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[Route("api/[controller]")]
[ApiController]
public class MusicStreamingController : ControllerBase
{
    private readonly IMusicStreamingInterface _musicStreamingService; // Correct naming convention with underscore
    private readonly IMemoryCache _cacheService;
    private readonly string[] _musicFiles; // Ensured consistent naming

    // Constructor for dependency injection
    public MusicStreamingController(
        IMusicStreamingInterface musicStreamingService,
        IMemoryCache memoryCache,
        string[] musicFiles // Injected here
    )
    {
        _musicStreamingService = musicStreamingService; // Proper assignment
        _cacheService = memoryCache;
        _musicFiles = musicFiles; // Correct assignment
    }

    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentSong()
    {
        try
        {
            string filePath = await _musicStreamingService.GetCurrentMusicFilePathAsync();
            if (string.IsNullOrEmpty(filePath))
            {
                return NotFound("Current music file not found.");
            }
            FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fileStream, "audio/mpeg", enableRangeProcessing: true);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("current/details")]
    public async Task<SongDetailsForPlayer> GetCurrentSongDetailsAsync()
    {
        int currentIndex = _cacheService.Get<int>("CurrentIndex");
        if (currentIndex >= 0 && currentIndex < _musicFiles.Length)
        {
            string filePath = _musicFiles[currentIndex];
            TagLib.File file = TagLib.File.Create(filePath);

            // Extract artist and song name
            string artistName = file.Tag?.FirstPerformer ?? "Unknown Artist";
            string songName = file.Tag?.Title ?? "Unknown Song";

            // Create and return the SongDetails object
            return new SongDetailsForPlayer
            {
                ArtistName = artistName,
                SongName = songName
            };
        }
        else
        {
            throw new InvalidOperationException("Current index is out of bounds.");
        }
    }

    [HttpGet("next")]
    public async Task<IActionResult> GetNextSong()
    {
        try
        {
            string filePath = await _musicStreamingService.GetNextMusicFilePathAsync();
            if (string.IsNullOrEmpty(filePath))
            {
                return NotFound("Next music file not found.");
            }
            FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fileStream, "audio/mpeg", enableRangeProcessing: true);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("previous")]
    public async Task<IActionResult> GetPreviousSong()
    {
        try
        {
            string filePath = await _musicStreamingService.GetPreviousMusicFilePathAsync();
            if (string.IsNullOrEmpty(filePath))
            {
                return NotFound("Previous music file not found.");
            }
            FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fileStream, "audio/mpeg", enableRangeProcessing: true);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("stream")]
    public async Task<IActionResult> Stream(string fileName)
    {
        try
        {
            string filePath = await _musicStreamingService.GetMusicFilePathAsync(fileName);

            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fileStream, "audio/mpeg");
        }
        catch (FileNotFoundException)
        {
            return NotFound("Music file not found.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}