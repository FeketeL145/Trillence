namespace BackEnd.Models.Dtos
{
    public record AlbumDto(Guid Id, string? Name, uint? Released);
    public record CreateAlbumDto(string? Name, uint? Released);
    public record RemoveAlbumDto(Guid Id);
    public record ModifyAlbumDto(string? Name, uint? Released);
}