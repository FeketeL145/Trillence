using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class MusicStreamingController : ControllerBase
{
    private readonly IMusicStreamingInterface _musicStreamingService;

    public MusicStreamingController(IMusicStreamingInterface musicStreamingService)
    {
        _musicStreamingService = musicStreamingService;
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