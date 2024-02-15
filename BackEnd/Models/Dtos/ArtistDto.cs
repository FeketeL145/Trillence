namespace BackEnd.Models.Dtos
{
    public record ArtistDto(Guid Id, string? Name, ArtistSong Id1, ArtistAlbum IdNavigation);
    public record CreateArtistDto(string? Name);
    public record RemoveArtistDto(Guid Id);
    public record ModifyArtistDto(string Name);
}