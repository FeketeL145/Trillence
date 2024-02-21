using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreInterface genreInterface;

        public GenreController(IGenreInterface genreInterface)
        {
            this.genreInterface = genreInterface;
        }

        [HttpPost("genre")]
        public async Task<ActionResult<GenreDto>> Post(CreateGenreDto createGenreDto)
        {
            return StatusCode(201, await genreInterface.Post(createGenreDto));
        }

        [HttpGet("allgenre")]
        public async Task<IEnumerable<Genre>> Get()
        {
            return await genreInterface.GetAll();
        }

        [HttpGet("genrebyid/{id}")]
        public async Task<ActionResult<Genre>> GetById(Guid id)
        {
            var result = await genreInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Genre with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Genre>> Put(Guid id, ModifyGenreDto modifyGenreDto)
        {
            var result = await genreInterface.Put(id, modifyGenreDto);

            if (result == null)
            {
                return StatusCode(404, $"Genre with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Genre>> DeleteById(Guid id)
        {
            var result = await genreInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't a genre with this id.");
            }

            return StatusCode(200, result);
        }
    }
}