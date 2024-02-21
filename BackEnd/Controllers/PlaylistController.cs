using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistInterface playlistInterface;

        public PlaylistController(IPlaylistInterface playlistInterface)
        {
            this.playlistInterface = playlistInterface;
        }

        [HttpPost("playlist")]
        public async Task<ActionResult<PlaylistDto>> Post(CreatePlaylistDto createPlaylistDto)
        {
            return StatusCode(201, await playlistInterface.Post(createPlaylistDto));
        }

        [HttpGet("allplaylist")]
        public async Task<IEnumerable<Playlist>> Get()
        {
            return await playlistInterface.GetAll();
        }

        [HttpGet("playlistbyid/{id}")]
        public async Task<ActionResult<Playlist>> GetById(Guid id)
        {
            var result = await playlistInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Playlist with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Playlist>> Put(Guid id, ModifyPlaylistDto modifyPlaylistDto)
        {
            var result = await playlistInterface.Put(id, modifyPlaylistDto);

            if (result == null)
            {
                return StatusCode(404, $"Playlist with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Playlist>> DeleteById(Guid id)
        {
            var result = await playlistInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't a playlist with this id.");
            }

            return StatusCode(200, result);
        }
    }
}