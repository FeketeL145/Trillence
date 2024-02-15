using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistSongController : ControllerBase
    {
        private readonly IArtistSongInterface artistsongInterface;

        public ArtistSongController(IArtistSongInterface artistsongInterface)
        {
            this.artistsongInterface = artistsongInterface;
        }

        [HttpPost("artistsong")]
        public async Task<ActionResult<ArtistSongDto>> Post(CreateArtistSongDto createArtistSongDto)
        {
            return StatusCode(201, await artistsongInterface.Post(createArtistSongDto));
        }

        [HttpGet("allartistsong")]
        public async Task<IEnumerable<ArtistSong>> Get()
        {
            return (IEnumerable<ArtistSong>)await artistsongInterface.GetAll();
        }

        [HttpGet("artistsongbyid/{artistid, songid}")]
        public async Task<ActionResult<ArtistSong>> GetById(Guid artistid, Guid songid)
        {
            var result = await artistsongInterface.GetById(artistid, songid);
            if (result == null)
            {
                return StatusCode(404, "ArtistSong with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{artistid}/{songid}")]
        public async Task<ActionResult<ArtistSong>> Put(Guid artistid, Guid songid, ModifyArtistSongDto modifyArtistSongDto)
        {
            var result = await artistsongInterface.Put(artistid, songid, modifyArtistSongDto);

            if (result == null)
            {
                return StatusCode(404, $"ArtistSong with the id of {artistid} and {songid} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{artistid, songid}")]
        public async Task<ActionResult<ArtistSong>> DeleteById(Guid artistid, Guid songid)
        {
            var result = await artistsongInterface.DeleteById(artistid, songid);

            if (result == null)
            {
                return StatusCode(404, "There isn't an artistsong with this id.");
            }

            return StatusCode(200, result);
        }
    }
}