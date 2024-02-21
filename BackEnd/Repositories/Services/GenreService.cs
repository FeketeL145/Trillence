using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class GenreService : IGenreInterface
    {
        private readonly TrillenceContext trillenceContext;

        public GenreService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<Genre> Post(CreateGenreDto createGenreDto)
        {
            var genre = new Genre
            {
                Id = Guid.NewGuid(),
                Name = createGenreDto.Name,
            };

            await trillenceContext.Genres.AddAsync(genre);
            await trillenceContext.SaveChangesAsync();
            return genre;
        }

        public async Task<IEnumerable<Genre>> GetAll()
        {
            return await trillenceContext.Genres.ToListAsync();
        }

        public async Task<Genre> GetById(Guid id)
        {
            var genre = await trillenceContext.Genres.FirstOrDefaultAsync(x => x.Id == id);
            return genre;
        }

        public async Task<Genre> Put(Guid id, ModifyGenreDto modifyGenreDto)
        {
            var existingGenre = await trillenceContext.Genres.FirstOrDefaultAsync(x => x.Id == id);

            if (existingGenre != null)
            {
                existingGenre.Name = modifyGenreDto.Name;

                trillenceContext.Update(existingGenre);
                await trillenceContext.SaveChangesAsync();

                return existingGenre;
            }

            return null;
        }

        public async Task<Genre> DeleteById(Guid id)
        {
            var genre = await trillenceContext.Genres.FirstOrDefaultAsync(x => x.Id == id);

            if (genre != null)
            {
                trillenceContext.Genres.Remove(genre);
                await trillenceContext.SaveChangesAsync();
            }

            return genre;
        }
    }
}