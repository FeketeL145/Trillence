namespace BackEnd.Models.Dtos
{
    public record AlbumDto(Guid? Id, string Name, string Image, DateOnly? Released, Guid? UserId, Song IdNavigation, User User);
    public record CreateAlbumDto(string Name, string Image, DateOnly Released);
    public record CreateAlbumDtoWithConnections(string Name, string Image, DateOnly? Released, Guid? UserId);
    public record RemoveAlbumDto(Guid? Id);
    public record ModifyAlbumDto(string Name, string Image, DateOnly? Released);
    public record ModifyAlbumDtoWithConnections(string Name, string Image, DateOnly? Released, Guid? UserId);
}