using BackEnd.Models;
using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IGenreInterface
    {
        Task<IEnumerable<Genre>> GetAll();
        Task<Genre> GetById(Guid id);
        Task<Genre> Post(CreateGenreDto createGenreDto);
        Task<Genre> Put(Guid id, ModifyGenreDto modifyGenreDto);
        Task<Genre> DeleteById(Guid id);
    }
}