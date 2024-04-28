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
        private readonly IConfiguration configuration;

        public AuthController(IAuth authService, IConfiguration configuration)
        {
            this.authService = authService;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto model)
        {
            string errorMessage = await authService.Register(model);

            if (!string.IsNullOrEmpty(errorMessage))
            {
                return StatusCode(400, errorMessage);
            }

            return StatusCode(201, "Registration was successful.");
        }

        [HttpPost("AssignRole")]
        public async Task<ActionResult> AssignRole([FromBody] RoleDto model)
        {
            bool assignRoleSuccessful = await authService.AssignRole(model.Email, model.RoleName.ToUpper());

            if (!assignRoleSuccessful)
            {
                return BadRequest();
            }

            return StatusCode(200, "Role was assigned successfully.");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto model)
        {
            LoginResponseDto loginResponse = await authService.Login(model);
            return StatusCode(200, loginResponse);
        }

        [HttpPut("change-username")]
        public async Task<ActionResult> ChangeUsername([FromBody] ChangeUsernameDto model)
        {
            bool success = await authService.ChangeUsername(model.OldUsername, model.NewUsername);

            if (!success)
            {
                return BadRequest("Failed to change username.");
            }

            return Ok("Username changed successfully.");
        }

        [HttpPut("change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            bool success = await authService.ChangePassword(model.Username, model.OldPassword, model.NewPassword);

            if (!success)
            {
                return BadRequest("Failed to change password.");
            }

            return Ok("Password changed successfully.");
        }

        [HttpPost("send-reset-email")]
        public async Task<IActionResult> SendResetTokenEmail([FromQuery] string emailAddress)
        {
            bool emailSent = await authService.SendResetTokenEmail(emailAddress);

            if (emailSent)
            {
                return Ok("Reset email sent successfully.");
            }
            else
            {
                return StatusCode(500, "Failed to send reset email.");
            }
        }

        [HttpPut("reset-password")]
        public async Task<ActionResult> ForgotPassword([FromBody] ResetPasswordDto model)
        {
            bool success = await authService.ForgotPassword(model.EmailAddress, model.NewPassword, model.resetToken);

            if (!success)
            {
                return BadRequest("Failed to change password.");
            }

            return Ok("Password changed successfully.");
        }

        [HttpDelete("delete-user/{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            bool success = await authService.DeleteUser(username);

            if (!success)
            {
                return NotFound("User not found or unable to delete user.");
            }

            return Ok("User deleted successfully.");
        }

        [HttpPost("is-admin")]
        public async Task<IActionResult> IsAdmin(string username)
        {
            IsAdminDtoResponse isAdmin = await authService.IsAdmin(username);

            return Ok(isAdmin);
        }
    }
}