namespace BackEnd.Models.Dtos
{
    public record SongDto(Guid Id, string? Name, TimeSpan? Length, Guid AlbumId, string Genre);
    public record CreateSongDto(string? Name, TimeSpan? Length, Guid AlbumId, string Genre);
    public record RemoveSongDto(Guid Id);
    public record ModifySongDto(string? Name, TimeSpan? Length, Guid AlbumId, string Genre);
}