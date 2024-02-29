using Microsoft.AspNetCore.Mvc;
using BackEnd;

[Route("api/[controller]")]
[ApiController]
public class MetadataController : ControllerBase
{
    private readonly Mp3MetadataReader mp3MetadataReader;

    public MetadataController(Mp3MetadataReader mp3MetadataReader)
    {
        this.mp3MetadataReader = mp3MetadataReader;
    }

    [HttpGet]
    public async Task<IActionResult> GetMetadata(string filePath)
    {
        await mp3MetadataReader.ReadMetadata(filePath);
        return Ok();
    }
}