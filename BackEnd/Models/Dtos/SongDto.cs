namespace BackEnd.Models.Dtos
{
    public record SongDto(Guid Id, string? Name, TimeOnly? Length, Guid? AlbumId, Guid? GenreId, Album? Album, Genre? Genre, PlaylistSong Id1, ArtistSong IdNavigation);
    public record CreateSongDto(string? Name, TimeOnly? Length, Guid? AlbumId, Guid? GenreId);
    public record RemoveSongDto(Guid? Id);
    public record ModifySongDto(string? Name, TimeOnly? Length, Guid? AlbumId, Guid? GenreId);
}