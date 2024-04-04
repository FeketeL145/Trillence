using Microsoft.AspNetCore.Mvc;
using BackEnd;

[Route("api/[controller]")]
[ApiController]
public class MetadataController : ControllerBase
{
    private readonly AudioMetadataReader mp3MetadataReader;

    public MetadataController(AudioMetadataReader mp3MetadataReader)
    {
        this.mp3MetadataReader = mp3MetadataReader;
    }

    [HttpGet]
    public async Task<IActionResult> GetMetadata()
    {
        await mp3MetadataReader.ReadMetadata();
        return Ok();
    }
}