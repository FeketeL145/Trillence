namespace BackEnd.Models.Dtos
{
    public record VerificationDto(int Id, string Code, string Email);
    public record CreateVerificationDto(string Email);
    public record RemoveVerificationDto(int Id);
    public record ModifyVerificationDto(string Code, string Email);
}