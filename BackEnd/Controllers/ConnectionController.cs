using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {
        private readonly IConnectionInterface _connection;

        public ConnectionController(IConnectionInterface connection)
        {
            _connection = connection;
        }

        [HttpGet("allsongdetails")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllSongDetails()
        {
            var result = await _connection.GetAllSongDetails();

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("songdetails/{id}")]
        public async Task<ActionResult> GetSongDetailsById(Guid id)
        {
            var result = _connection.GetSongDetailsById(id).Result;

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("allplaylistdetails")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllPlaylistDetails()
        {
            var result = await _connection.GetAllPlaylistDetails();

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("playlistdetailsby/{id}")]
        public async Task<ActionResult> GetPlaylistDetailsById(Guid id)
        {
            var result = _connection.GetPlaylistDetailsById(id).Result;

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}