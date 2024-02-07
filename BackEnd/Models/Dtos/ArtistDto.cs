namespace BackEnd.Models.Dtos
{
    public record ArtistDto(Guid Id, Guid AlbumId, Song IdNavigaton, User User);
    public record CreateArtistDto(Guid AlbumId, Song IdNavigation, User User);
    public record RemoveArtistDto(Guid Id);
    public record ModifyArtistDto(Guid AlbumId, Song IdNavigation, User User);
}