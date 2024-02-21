using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface userInterface;

        public UserController(IUserInterface userInterface)
        {
            this.userInterface = userInterface;
        }

        [HttpPost("user")]
        public async Task<ActionResult<UserDto>> Post(CreateUserDto createUserDto)
        {
            return StatusCode(201, await userInterface.Post(createUserDto));
        }

        [HttpGet("alluser")]
        public async Task<IEnumerable<User>> Get()
        {
            return await userInterface.GetAll();
        }

        [HttpGet("userbyid/{id}")]
        public async Task<ActionResult<User>> GetById(Guid id)
        {
            var result = await userInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "User with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<User>> Put(Guid id, ModifyUserDto modifyUserDto)
        {
            var result = await userInterface.Put(id, modifyUserDto);

            if (result == null)
            {
                return StatusCode(404, $"User with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<User>> DeleteById(Guid id)
        {
            var result = await userInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't a user with this id.");
            }

            return StatusCode(200, result);
        }
    }
}