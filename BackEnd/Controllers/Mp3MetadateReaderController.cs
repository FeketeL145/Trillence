using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class MetadataController : ControllerBase
{
    [HttpGet]
    public IActionResult GetMetadata(string filePath)
    {
        Mp3MetadataReader.ReadMetadata(filePath);
        return Ok();
    }
}