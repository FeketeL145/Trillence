namespace BackEnd.Repositories.Interfaces
{
    public interface IConnectionInterface
    {
        Task<object> GetAllSongDetails();
        Task<object> GetSongDetailsById(Guid songId);
        Task<object> GetSongDetailsByName(string songName);
        Task<object> GetAllPlaylistDetails();
        Task<object> GetPlaylistDetailsById(Guid playlistId);
        Task<object> GetPlaylistDetailsByUsername(string username);
    }
}