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
            var assignRoleSuccessful = await authService.AssignRole(model.Email, model.RoleName.ToUpper());

            if (!assignRoleSuccessful)
            {
                return BadRequest();
            }

            return StatusCode(200, "Role was assigned successfully.");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto model)
        {
            var loginResponse = await authService.Login(model);
            return StatusCode(200, loginResponse);
        }

        [HttpPut("change-username")]
        public async Task<ActionResult> ChangeUsername([FromBody] ChangeUsernameDto model)
        {
            var success = await authService.ChangeUsername(model.OldUsername, model.NewUsername);

            if (!success)
            {
                return BadRequest("Failed to change username.");
            }

            return Ok("Username changed successfully.");
        }

        [HttpPut("change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            var success = await authService.ChangePassword(model.Username, model.OldPassword, model.NewPassword);

            if (!success)
            {
                return BadRequest("Failed to change password.");
            }

            return Ok("Password changed successfully.");
        }
    }
}