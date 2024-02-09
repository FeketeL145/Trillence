using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IPlaylistsongInterface
    {
        Task<IEnumerable<Playlistsong>> GetAll();
        Task<Playlistsong> GetById(Guid playlistid, Guid songid);
        Task<Playlistsong> Post(CreatePlaylistSongDto createPlaylistsongDto);
        Task<Playlistsong> Put(Guid playlistid, Guid songid, ModifyPlaylistSongDto modifyPlaylistsongDto);
        Task<Playlistsong> DeleteById(Guid playlistid, Guid songid);
    }
}