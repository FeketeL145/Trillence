namespace BackEnd.Models.Dtos
{
    public record PlaylistDto(Guid Id, Guid? UserId, string? Name, User? User);
    public record CreatePlaylistDto(string? Name, Guid UserId);
    public record RemovePlaylistDto(Guid Id);
    public record ModifyPlaylistDto(string? Name, Guid? UserId);
}