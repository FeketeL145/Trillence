namespace BackEnd.Models.Dtos
{
    public record SongDto(Guid Id, string Name, TimeOnly Length, long Listens, long Likes, long Dislikes, Guid ArtistId, Guid AlbumId, Guid GenreId, Album Album, Artist Artist, Genre Genre, Album IdNavigation);
    public record CreateSongDto(string Name, TimeOnly Length, Guid ArtistId, Guid AlbumId, Guid GenreId, Album Album, Artist Artist, Genre Genre, Album IdNavigation);
    public record RemoveSongDto(Guid Id);
    public record ModifySongDto(string Name, TimeOnly Length, Guid ArtistId, Guid AlbumId, Guid GenreId, Album Album, Artist Artist, Genre Genre, Album IdNavigation);
}