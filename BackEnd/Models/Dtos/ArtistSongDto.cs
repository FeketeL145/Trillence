namespace BackEnd.Models.Dtos
{
    public record ArtistSongDto(Guid ArtistId, Guid SongId, Song? Song);
    public record CreateArtistSongDto(Guid ArtistId, Guid SongId);
    public record RemoveArtistSongDto(Guid ArtistId, Guid SongId);
    public record ModifyArtistSongDto(Guid ArtistId, Guid SongId);
}