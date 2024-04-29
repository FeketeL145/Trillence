using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface ISongInterface
    {
        Task<IEnumerable<Song>> GetAll(int pageNumber);
        Task<int> GetCount();
        Task<Song> GetById(Guid id);
        Task<SongDto> Post(CreateSongDto createSongDto);
        Task<SongDto> Put(Guid id, ModifySongDto modifySongDto);
        Task<Song> DeleteById(Guid id);
    }
}