namespace BackEnd.Models.Dtos
{
    public record UserDto(Guid Id, string Name, string Password, DateOnly Birth, Artist IdNavigation);
    public record CreateUserDto(string Name, string Password, DateOnly Birth, Artist IdNavigation);
    public record RemoveUserDto(Guid Id);
    public record ModifyUserDto(string Name, string Password, DateOnly Birth, Artist IdNavigation);
}