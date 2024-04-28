namespace Auth.Models.Dtos
{
    public class ResetPasswordDto
    {
        public string EmailAddress { get; set; }
        public string NewPassword { get; set; }
        public string resetToken { get; set; }
    }
}