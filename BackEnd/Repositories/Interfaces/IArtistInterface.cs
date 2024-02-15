using BackEnd.Models.Dtos;
using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces
{
    public interface IArtistInterface
    {
        Task<IEnumerable<Artist>> GetAll();
        Task<Artist> GetById(Guid id);
        Task<ArtistDto> Post(CreateArtistDto createArtistDto);
        Task<ArtistDto> Put(Guid id, ModifyArtistDto modifyArtistDto);
        Task<Artist> DeleteById(Guid id);
    }
}