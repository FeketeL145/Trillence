using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly ISongInterface songInterface;

        public SongController(ISongInterface songInterface)
        {
            this.songInterface = songInterface;
        }

        [HttpPost("song")]
        public async Task<ActionResult<SongDto>> Post(CreateSongDto createSongDto)
        {
            return StatusCode(201, await songInterface.Post(createSongDto));
        }

        [HttpGet("allsong")]
        public async Task<IEnumerable<Song>> Get()
        {
            return await songInterface.GetAll();
        }

        [HttpGet("songbyid/{id}")]
        public async Task<ActionResult<Song>> GetById(Guid id)
        {
            var result = await songInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Song with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Song>> Put(Guid id, ModifySongDto modifySongDto)
        {
            var result = await songInterface.Put(id, modifySongDto);

            if (result == null)
            {
                return StatusCode(404, $"Song with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Song>> DeleteById(Guid id)
        {
            var result = await songInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't a song with this id.");
            }

            return StatusCode(200, result);
        }
    }
}