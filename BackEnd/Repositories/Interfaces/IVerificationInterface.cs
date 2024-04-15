using BackEnd.Models.Dtos;
using Email_Test_API.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Repositories.Interfaces
{
    public interface IVerificationInterface
    {
        Task<IEnumerable<Verification>> GetAll();
        Task<Verification> GetById(int id);
        Task<Verification> GetByEmail(string email);
        Task<Verification> Post(CreateVerificationDto createVerificationDto);
        Task<bool> SendVerificationEmail(EmailDto request, string code);
        Task<bool> VerifyCodeAsync(string code, string email);
        Task<Verification> Put(int id, ModifyVerificationDto modifyVerificationDto);
        Task<Verification> DeleteById(int id);
    }
}