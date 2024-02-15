using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistAlbumController : ControllerBase
    {
        private readonly IArtistAlbumInterface artistalbumInterface;

        public ArtistAlbumController(IArtistAlbumInterface artistalbumInterface)
        {
            this.artistalbumInterface = artistalbumInterface;
        }

        [HttpPost("artistalbum")]
        public async Task<ActionResult<ArtistAlbumDto>> Post(CreateArtistAlbumDto createArtistAlbumDto)
        {
            return StatusCode(201, await artistalbumInterface.Post(createArtistAlbumDto));
        }

        [HttpGet("allartistalbum")]
        public async Task<IEnumerable<ArtistAlbum>> Get()
        {
            return (IEnumerable<ArtistAlbum>)await artistalbumInterface.GetAll();
        }

        [HttpGet("artistalbumbyid/{artistid, albumid}")]
        public async Task<ActionResult<ArtistAlbum>> GetById(Guid artistid, Guid albumid)
        {
            var result = await artistalbumInterface.GetById(artistid, albumid);
            if (result == null)
            {
                return StatusCode(404, "ArtistAlbum with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{artistid}/{albumid}")]
        public async Task<ActionResult<ArtistAlbum>> Put(Guid artistid, Guid albumid, ModifyArtistAlbumDto modifyArtistAlbumDto)
        {
            var result = await artistalbumInterface.Put(artistid, albumid, modifyArtistAlbumDto);

            if (result == null)
            {
                return StatusCode(404, $"ArtistAlbum with the id of {artistid} and {albumid} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{artistid, albumid}")]
        public async Task<ActionResult<ArtistAlbum>> DeleteById(Guid artistid, Guid albumid)
        {
            var result = await artistalbumInterface.DeleteById(artistid, albumid);

            if (result == null)
            {
                return StatusCode(404, "There isn't an artistalbum with this id.");
            }

            return StatusCode(200, result);
        }
    }
}