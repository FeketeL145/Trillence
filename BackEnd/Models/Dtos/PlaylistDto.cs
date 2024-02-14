namespace BackEnd.Models.Dtos
{
    public record PlaylistDto(Guid? Id, string Name, Guid? UserId, Playlistsong IdNavigation, User? User);
    public record CreatePlaylistDto(string Name);
    public record CreatePlaylistDtoWithConnections(string Name, Guid? UserId);
    public record RemovePlaylistDto(Guid? Id);
    public record ModifyPlaylistDto(string Name);
    public record ModifyPlaylistDtoWithConnections(string Name, Guid? UserId);
}