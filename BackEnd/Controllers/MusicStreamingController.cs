using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

[Route("api/[controller]")]
[ApiController]
public class MusicStreamingController : ControllerBase
{
    private readonly IMusicStreamingInterface _musicStreamingService;
    private readonly IMemoryCache _cacheService;
    private readonly string[] _musicFiles;

    public MusicStreamingController(
        IMusicStreamingInterface musicStreamingService,
        IMemoryCache memoryCache,
        string[] musicFiles
    )
    {
        _musicStreamingService = musicStreamingService;
        _cacheService = memoryCache;
        _musicFiles = musicFiles;
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
        try
        {
            return await _musicStreamingService.GetCurrentSongDetailsAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error fetching current song details: {ex.Message}");
            return new SongDetailsForPlayer();
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