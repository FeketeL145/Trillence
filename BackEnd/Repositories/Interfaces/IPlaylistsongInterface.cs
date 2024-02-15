using BackEnd.Models;
using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IPlaylistsongInterface
    {
        Task<IEnumerable<PlaylistSong>> GetAll();
        Task<PlaylistSong> GetById(Guid playlistid, Guid songid);
        Task<PlaylistSong> Post(CreatePlaylistSongDto createPlaylistsongDto);
        Task<PlaylistSong> Put(Guid playlistid, Guid songid, ModifyPlaylistSongDto modifyPlaylistsongDto);
        Task<PlaylistSong> DeleteById(Guid playlistid, Guid songid);
    }
}