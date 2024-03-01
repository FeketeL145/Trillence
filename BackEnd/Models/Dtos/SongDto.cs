namespace BackEnd.Models.Dtos
{
    public record SongDto(Guid Id, string? Name, TimeSpan? Length, Guid AlbumId, string Genres);
    public record CreateSongDto(string? Name, TimeSpan? Length, Guid AlbumId, string Genres);
    public record RemoveSongDto(Guid Id);
    public record ModifySongDto(string? Name, TimeSpan? Length, Guid AlbumId, string Genres);
}