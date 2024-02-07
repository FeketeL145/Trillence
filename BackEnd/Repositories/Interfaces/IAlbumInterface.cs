using BackEnd.Models;
using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IAlbumInterface
    {
        Task<IEnumerable<Album>> GetAll();
        Task<Album> GetById(Guid id);
        Task<AlbumDto> Post(CreateAlbumDto createAlbumDto);
        Task<AlbumDto> Put(Guid id, ModifyAlbumDto modifyAlbumDto);
        Task<Album> DeleteById(Guid id);
    }
}