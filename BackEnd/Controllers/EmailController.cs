using BackEnd.Repositories.Interfaces;
using Email_Test_API.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Email_Test_API.Controllers
{
    [ApiController]
    [Route("email")]

    public class EmailController : ControllerBase
    {
        private readonly IEmailInterface emailService;

        public EmailController(IEmailInterface emailService)
        {
            this.emailService = emailService;
        }

        [HttpPost]
        public IActionResult SendEmail(EmailDto request)
        {
            emailService.SendEmail(request);
            return StatusCode(200, "Levél elküldve.");
        }
    }
}