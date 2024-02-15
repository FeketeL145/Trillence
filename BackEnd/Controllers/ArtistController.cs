using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly IArtistInterface artistInterface;

        public ArtistController(IArtistInterface artistInterface)
        {
            this.artistInterface = artistInterface;
        }

        [HttpPost("artist")]
        public async Task<ActionResult<ArtistDto>> Post(CreateArtistDto createArtistDto)
        {
            return StatusCode(201, await artistInterface.Post(createArtistDto));
        }

        [HttpGet("allartist")]
        public async Task<IEnumerable<Artist>> Get()
        {
            return await artistInterface.GetAll();
        }

        [HttpGet("artistbyid/{id}")]
        public async Task<ActionResult<Artist>> GetById(Guid id)
        {
            var result = await artistInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Artist with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Artist>> Put(Guid id, ModifyArtistDto modifyArtistDto)
        {
            var result = await artistInterface.Put(id, modifyArtistDto);

            if (result == null)
            {
                return StatusCode(404, $"Artist with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Artist>> DeleteById(Guid id)
        {
            var result = await artistInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't an artist with this id.");
            }

            return StatusCode(200, result);
        }
    }
}