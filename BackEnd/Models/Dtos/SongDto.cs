namespace BackEnd.Models.Dtos
{
    public record SongDto(Guid? Id, string Name, TimeOnly? Length, Guid? UserId, Guid? AlbumId, Guid? GenreId, Album? Album, Genre? Genre, Playlistsong IdNavigation, User? User);
    public record CreateSongDto(string Name, TimeOnly? Length);
    public record CreateSongDtoWithConnections(string Name, TimeOnly? Length, Guid? UserId, Guid? AlbumId, Guid? GenreId);
    public record RemoveSongDto(Guid? Id);
    public record ModifySongDto(string Name, TimeOnly? Length);
    public record ModifySongDtoWithConnections(string Name, TimeOnly? Length, Guid? UserId, Guid? AlbumId, Guid? GenreId);
}