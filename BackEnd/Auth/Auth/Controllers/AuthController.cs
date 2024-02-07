using Auth.Models.Dtos;
using Auth.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace Auth.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth authService;

        public AuthController(IAuth authService)
        {
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto model)
        {
            var errorMessage = await authService.Register(model);

            if (!string.IsNullOrEmpty(errorMessage))
            {

                return StatusCode(400, errorMessage);
            }

            return StatusCode(201, "Registration was successful.");
        }

        [HttpPost("AssignRole")]
        public async Task<ActionResult> AssignRole([FromBody] RoleDto model)
        {

            var assignRoleSuccesful = await authService.AssignRole(model.Email, model.RoleName.ToUpper());

            if (!assignRoleSuccesful)
            {
                return BadRequest();
            }


            return StatusCode(200, "Role was assigned successfully.");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto model)
        {
            var loginResponse = await authService.Login(model);

            if (loginResponse.User == null)
            {
                return BadRequest("The username or password is incorrect!");
            }

            return StatusCode(200, loginResponse);
        }
    }
}