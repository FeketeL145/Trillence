namespace BackEnd.Repositories.Interfaces
{
    public interface IMusicStreamingInterface
    {
        Task<string> GetMusicFilePathAsync(string fileName);
    }
}