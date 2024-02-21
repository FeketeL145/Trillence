namespace BackEnd.Models.Dtos
{
    public record ArtistDto(Guid Id, string? Name);
    public record CreateArtistDto(string? Name);
    public record RemoveArtistDto(Guid Id);
    public record ModifyArtistDto(string? Name);
}