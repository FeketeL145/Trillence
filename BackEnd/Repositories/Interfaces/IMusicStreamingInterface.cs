namespace BackEnd.Repositories.Interfaces
{
    public interface IMusicStreamingInterface
    {
        Task<string> GetCurrentMusicFilePathAsync();
        Task<string> GetNextMusicFilePathAsync();
        Task<string> GetPreviousMusicFilePathAsync();
        Task<ICollection<Song>> GetSongsFromPlaylistAsync(Guid playlistId);
        Task<string> GetCurrentMusicFilePathFromPlaylistAsync(Guid playlistId);
        Task<string> GetNextMusicFilePathFromPlaylistAsync(Guid playlistId);
        Task<string> GetPreviousMusicFilePathFromPlaylistAsync(Guid playlistId);
        Task<SongDetailsForPlayer> GetCurrentSongDetailsAsync();
        Task<SongDetailsForPlayer> GetCurrentPlaylistSongDetailsAsync(Guid playlistId);
        Task<string> GetMusicFilePathAsync(string fileName);
    }
}