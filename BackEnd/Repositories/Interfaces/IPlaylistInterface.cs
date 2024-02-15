using BackEnd.Models;
using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IPlaylistInterface
    {
        Task<IEnumerable<Playlist>> GetAll();
        Task<Playlist> GetById(Guid id);
        Task<Playlist> Post(CreatePlaylistDto createPlaylistDto);
        Task<Playlist> Put(Guid id, ModifyPlaylistDto modifyPlaylistDto);
        Task<Playlist> DeleteById(Guid id);
    }
}