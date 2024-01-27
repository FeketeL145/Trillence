using Email_Test_API.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(EmailDto request);
    }
}