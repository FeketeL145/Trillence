using BackEnd.Models.Dtos;
using Email_Test_API.Models.Dtos;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace BackEnd.Repositories.Services
{
    public class VerificationService : IVerificationInterface
    {
        private readonly TrillenceContext trillenceContext;
        private readonly IConfiguration configuration;
        public int code;

        public VerificationService(TrillenceContext trillenceContext, IConfiguration configuration)
        {
            this.trillenceContext = trillenceContext;
            this.configuration = configuration;
        }

        public async Task<Verification> Post(CreateVerificationDto createVerificationDto)
        {
            Random random = new Random();
            code = random.Next(100000, 999999);

            var verification = new Verification
            {
                Code = code.ToString(),
                Email = createVerificationDto.Email,
            };

            await trillenceContext.Verifications.AddAsync(verification);
            await trillenceContext.SaveChangesAsync();
            return verification;
        }

        public async Task<bool> SendVerificationEmail(EmailDto request, string code)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(configuration.GetSection("EmailSettings:EmailUserName").Value));
                email.To.Add(MailboxAddress.Parse(request.To));
                email.Subject = request.Subject;
                email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = $"<h1>Here is your verification code: {code}</h1>" };

                using var smtp = new SmtpClient();
                smtp.Connect(configuration.GetSection("EmailSettings:EmailHost").Value, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(configuration.GetSection("EmailSettings:EmailUserName").Value, configuration.GetSection("EmailSettings:EmailPassword").Value);
                smtp.Send(email);
                smtp.Disconnect(true);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }


        public async Task<IEnumerable<Verification>> GetAll()
        {
            return await trillenceContext.Verifications.ToListAsync();
        }

        public async Task<Verification> GetById(int id)
        {
            return await trillenceContext.Verifications.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Verification> GetByEmail(string email)
        {
            return await trillenceContext.Verifications.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<Verification> Put(int id, ModifyVerificationDto modifyVerificationDto)
        {
            var existingverification = await trillenceContext.Verifications.FirstOrDefaultAsync(x => x.Id == id);

            if (existingverification != null)
            {
                existingverification.Code = modifyVerificationDto.Code;
                existingverification.Email = modifyVerificationDto.Email;

                trillenceContext.Update(existingverification);
                await trillenceContext.SaveChangesAsync();

                return existingverification;
            }

            return null;
        }

        public async Task<bool> VerifyCodeAsync(string code, string email)
        {
            var verification = await trillenceContext.Verifications.FirstOrDefaultAsync(v => v.Email == email);

            if (verification != null && verification.Code == code)
            {
                return true;
            }

            return false;
        }

        public async Task<Verification> DeleteById(int id)
        {
            var verification = await trillenceContext.Verifications.FirstOrDefaultAsync(x => x.Id == id);

            if (verification != null)
            {
                trillenceContext.Verifications.Remove(verification);
                await trillenceContext.SaveChangesAsync();
            }

            return verification;
        }
    }
}