namespace BackEnd.Models.Dtos
{
    public record PlaylistSongDto(Guid PlaylistId, Guid SongId, Playlist? Playlist, Song? Song);
    public record CreatePlaylistSongDto(Guid PlaylistId, Guid SongId);
    public record RemovePlaylistSongDto(Guid PlaylistId, Guid SongId);
    public record ModifyPlaylistSongDto(Guid PlaylistId, Guid SongId);
}