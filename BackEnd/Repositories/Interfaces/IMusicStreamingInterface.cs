namespace BackEnd.Repositories.Interfaces
{
    public interface IMusicStreamingInterface
    {
        Task<string> GetCurrentMusicFilePathAsync();
        Task<string> GetNextMusicFilePathAsync();
        Task<string> GetPreviousMusicFilePathAsync();
        Task<SongDetailsForPlayer> GetCurrentSongDetailsAsync();
        Task<string> GetMusicFilePathAsync(string fileName);
    }
}