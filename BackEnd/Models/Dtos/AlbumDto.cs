namespace BackEnd.Models.Dtos
{
    public record AlbumDto(Guid Id, string? Name, string? Image, DateOnly? Released, Song IdNavigation);
    public record CreateAlbumDto(string Name, string Image, DateOnly Released);
    public record RemoveAlbumDto(Guid? Id);
    public record ModifyAlbumDto(string Name, string Image, DateOnly? Released);
}