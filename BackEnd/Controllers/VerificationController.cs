using BackEnd.Models.Dtos;
using Email_Test_API.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerificationController : ControllerBase
    {
        private readonly IVerificationInterface verificationInterface;

        public VerificationController(IVerificationInterface verificationInterface)
        {
            this.verificationInterface = verificationInterface;
        }

        [HttpPost("verificationAndEmail")]
        public async Task<IActionResult> PostAndSendVerificationEmail(CreateVerificationDto createVerificationDto)
        {
            try
            {
                var verification = await verificationInterface.Post(createVerificationDto);
                EmailDto emailDto = new EmailDto(
                    createVerificationDto.Email, 
                    "Trillence - Verification Email");

                var isEmailSent = await verificationInterface.SendVerificationEmail(emailDto, verification.Code);

                if (isEmailSent)
                    return StatusCode(200, "Verification email sent successfully.");
                else
                    return StatusCode(500, "Failed to send the verification email.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("verifycode")]
        public async Task<IActionResult> VerifyCode([FromBody] VerificationRequest request)
        {
            if (await verificationInterface.VerifyCodeAsync(request.Code, request.Email))
            {
                return Ok("Code matched successfully.");
            }
            else
            {
                return BadRequest("Invalid code or email.");
            }
        }

        [HttpGet("allverification")]
        public async Task<IEnumerable<Verification>> Get()
        {
            return await verificationInterface.GetAll();
        }

        [HttpGet("verificationbyid/{id}")]
        public async Task<ActionResult<Verification>> GetById(int id)
        {
            var result = await verificationInterface.GetById(id);
            if (result == null)
            {
                return StatusCode(404, "Verification with this id cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpGet("verificationbyemail/{email}")]
        public async Task<ActionResult<Verification>> GetByEmail(string email)
        {
            var result = await verificationInterface.GetByEmail(email);
            if (result == null)
            {
                return StatusCode(404, "Verification with this email cannot be found.");
            }

            return StatusCode(200, result);
        }

        [HttpPut("updatebyid/{id}")]
        public async Task<ActionResult<Verification>> Put(int id, ModifyVerificationDto modifyVerificationDto)
        {
            var result = await verificationInterface.Put(id, modifyVerificationDto);

            if (result == null)
            {
                return StatusCode(404, $"Verification with the id of {id} couldn't be found.");
            }

            return StatusCode(200, result);
        }

        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<Verification>> DeleteById(int id)
        {
            var result = await verificationInterface.DeleteById(id);

            if (result == null)
            {
                return StatusCode(404, "There isn't an verification with this id.");
            }

            return StatusCode(200, result);
        }
    }
}