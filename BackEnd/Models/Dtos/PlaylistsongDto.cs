namespace BackEnd.Models.Dtos
{
    public record PlaylistSongDto(Guid SongId, Guid PlaylistId, Playlist Playlist, Song Song);
    public record CreatePlaylistSongDto(Guid SongId, Guid PlaylistId);
    public record RemovePlaylistSongDto(Guid SongId, Guid PlaylistId);
    public record ModifyPlaylistSongDto(Guid SongId, Guid PlaylistId);
}