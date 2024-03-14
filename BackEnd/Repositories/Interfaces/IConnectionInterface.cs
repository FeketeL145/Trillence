namespace BackEnd.Repositories.Interfaces
{
    public interface IConnectionInterface
    {
        Task<object> GetAllSongDetails();
        Task<object> GetSongDetailsById(Guid songId);
        Task<object> GetAllPlaylistDetails();
        Task<object> GetPlaylistDetailsById(Guid playlistId);
    }
}