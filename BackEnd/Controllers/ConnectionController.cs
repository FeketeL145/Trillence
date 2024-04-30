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
            object result = await _connection.GetAllSongDetails();

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("songdetailsbyid/{id}")]
        public async Task<ActionResult> GetSongDetailsById(Guid id)
        {
            object result = _connection.GetSongDetailsById(id).Result;

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("songdetailsbyname/{songName}")]
        public async Task<ActionResult> GetSongDetailsByName(string songName)
        {
            object result = _connection.GetSongDetailsByName(songName).Result;

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
            object result = await _connection.GetAllPlaylistDetails();

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("playlistdetailsbyid/{id}")]
        public async Task<ActionResult> GetPlaylistDetailsById(Guid id)
        {
            object result = _connection.GetPlaylistDetailsById(id).Result;

            if (result != null)
            {
                return StatusCode(200, result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("playlistdetailsbyusername/{username}")]
        public async Task<ActionResult> GetPlaylistDetailsByUsername(string username)
        {
            object result = _connection.GetPlaylistDetailsByUsername(username).Result;

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