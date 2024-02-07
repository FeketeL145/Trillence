namespace BackEnd.Models.Dtos
{
    public record AlbumDto(Guid Id, string Name, DateOnly Released, long Listens, Guid ArtistId, Guid SongId, Song IdNavigation, Song Song);
    public record CreateAlbumDto(string Name, DateOnly Released, Guid ArtistId, Guid SongId, Song SongIdNavigation, Song Song);
    public record RemoveAlbumDto(Guid Id);
    public record ModifyAlbumDto(string Name, DateOnly Released, Guid ArtistId, Guid SongId, Song SongIdNavigation, Song Song);
}