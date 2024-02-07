using BackEnd.Repositories.Interfaces;
using Email_Test_API.Models.Dtos;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace BackEnd.Repositories.Services
{
    public class EmailService : IEmailInterface
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void SendEmail(EmailDto request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(configuration.GetSection
                ("EmailSettings:EmailUserName").Value));

            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = request.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(configuration.GetSection("EmailSettings:EmailHost").Value, 587, SecureSocketOptions.StartTls);

            smtp.Authenticate(configuration.GetSection("EmailSettings:EmailUserName").Value,
                configuration.GetSection("EmailSettings:EmailPassword").Value);

            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}