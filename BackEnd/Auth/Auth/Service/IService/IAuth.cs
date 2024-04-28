using Auth.Models.Dtos;

namespace Auth.Service.IService
{
    public interface IAuth
    {
        Task<string> Register(RegisterRequestDto registerRequestDtocs);
        Task<bool> AssignRole(string email, string roleName);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> ChangeUsername(string oldUsername, string newUsername);
        Task<bool> ChangePassword(string username, string oldPassword, string newPassword);
        Task<bool> SendResetTokenEmail(string emailAddress);
        Task<bool> ForgotPassword(string emailAddress, string newPassword, string resetToken);
        Task<bool> DeleteUser(string username);
        Task<IsAdminDtoResponse> IsAdmin(string username);
    }
}