using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumImageController : ControllerBase
    {
        private readonly IAlbumImageInterface _albumImageInterface;

        public AlbumImageController(IAlbumImageInterface albumImageInterface)
        {
            _albumImageInterface = albumImageInterface;
        }

        [HttpGet("{albumName}")]
        public IActionResult GetAlbumImage(string albumName)
        {
            byte[] imageData = _albumImageInterface.GetAlbumImage(albumName);

            if (imageData == null)
            {
                return NotFound();
            }

            return File(imageData, "image/jpeg");
        }
    }
}