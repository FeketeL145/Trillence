namespace Auth.Models.Dtos
{
    public class LoginResponseDto
    {
        public RegisterResponseDto User { get; set; }
        public string Token { get; set; }
    }
}