using Auth.Models.Dtos;

namespace Auth.Service.IService
{
    public interface IAuth
    {
        Task<string> Register(RegisterRequestDto registerRequestDtocs);
        Task<bool> AssignRole(string email, string roleName);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
    }
}