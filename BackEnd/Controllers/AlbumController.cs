using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumInterface albumInterface;

        public AlbumController(IAlbumInterface albumInterface)
        {
            this.albumInterface = albumInterface;
        }

        [HttpPost("album")]
        public async Task<ActionResult<AlbumDto>> Post(CreateAlbumDto createAlbumDto)
        {
            return StatusCode(201, await albumInterface.Post(createAlbumDto));
        }

        [HttpGet("allalbum")]
        public async Task<IEnumerable<Album>> Get()
        {
            return await albumInterface.GetAll();
        }

        [HttpGet("albumbyid/{id}")]
        public async Task<ActionResult<Album>> GetById(Guid id)
        {
            var result = await albumInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Album with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Album>> Put(Guid id, ModifyAlbumDto modifyAlbumDto)
        {
            var result = await albumInterface.Put(id, modifyAlbumDto);

            if (result == null)
            {
                return StatusCode(404, $"Album with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Album>> DeleteById(Guid id)
        {
            var result = await albumInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't an album with this id.");
            }

            return StatusCode(200, result);
        }
    }
}