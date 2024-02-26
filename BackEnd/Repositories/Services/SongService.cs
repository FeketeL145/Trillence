using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class SongService : ISongInterface
    {
        private readonly TrillenceContext trillenceContext;

        public SongService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<SongDto> Post(CreateSongDto createSongDto)
        {
            var song = new Song
            {
                Id = Guid.NewGuid(),
                Name = createSongDto.Name,
                Length = createSongDto.Length,
                AlbumId = createSongDto.AlbumId,
                Genre = createSongDto.Genre,
            };

            await trillenceContext.Songs.AddAsync(song);
            await trillenceContext.SaveChangesAsync();
            return song.AsDto();
        }

        public async Task<IEnumerable<Song>> GetAll()
        {
            return await trillenceContext.Songs.ToListAsync();
        }

        public async Task<Song> GetById(Guid id)
        {
            return await trillenceContext.Songs.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<SongDto> Put(Guid id, ModifySongDto modifySongDto)
        {
            var existingSong = await trillenceContext.Songs.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSong != null)
            {
                existingSong.Name = modifySongDto.Name;
                existingSong.Length = modifySongDto.Length;
                existingSong.Genre = modifySongDto.Genre;

                trillenceContext.Update(existingSong);
                await trillenceContext.SaveChangesAsync();

                return existingSong.AsDto();
            }

            return null;
        }

        public async Task<Song> DeleteById(Guid id)
        {
            var song = await trillenceContext.Songs.FirstOrDefaultAsync(x => x.Id == id);

            if (song != null)
            {
                trillenceContext.Songs.Remove(song);
                await trillenceContext.SaveChangesAsync();
            }

            return song;
        }
    }
}