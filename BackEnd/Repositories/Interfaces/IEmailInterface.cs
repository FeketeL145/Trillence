using Email_Test_API.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IEmailInterface
    {
        void SendEmail(EmailDto request);
    }
}