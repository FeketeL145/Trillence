﻿using BackEnd.Models.Dtos;
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

        [HttpGet("allsongpaginated")]
        public async Task<IEnumerable<Song>> GetAllWithPage(int pageNumber)
        {
            return await songInterface.GetAllWithPage(pageNumber);
        }
        [HttpGet("allsong")]
        public async Task<IEnumerable<Song>> Get()
        {
            return await songInterface.GetAll();
        }

        [HttpGet("songcount")]
        public async Task<int> GetCount()
        {
            return await songInterface.GetCount();
        }

        [HttpGet("songbyid/{id}")]
        public async Task<ActionResult<Song>> GetById(Guid id)
        {
            Song result = await songInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Song with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Song>> Put(Guid id, ModifySongDto modifySongDto)
        {
            SongDto result = await songInterface.Put(id, modifySongDto);

            if (result == null)
            {
                return StatusCode(404, $"Song with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Song>> DeleteById(Guid id)
        {
            Song result = await songInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't a song with this id.");
            }

            return StatusCode(200, result);
        }
    }
}