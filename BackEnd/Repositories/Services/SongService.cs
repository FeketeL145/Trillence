using BackEnd.Models.Dtos;
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
            Song song = new Song
            {
                Id = Guid.NewGuid(),
                Name = createSongDto.Name,
                Length = createSongDto.Length,
                AlbumId = createSongDto.AlbumId,
                Genre = createSongDto.Genres,
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
            Song? existingSong = await trillenceContext.Songs.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSong != null)
            {
                existingSong.Name = modifySongDto.Name;
                existingSong.Length = modifySongDto.Length;
                existingSong.Genre = modifySongDto.Genres;

                trillenceContext.Update(existingSong);
                await trillenceContext.SaveChangesAsync();

                return existingSong.AsDto();
            }

            return null;
        }

        public async Task<Song> DeleteById(Guid id)
        {
            Song? song = await trillenceContext.Songs.FirstOrDefaultAsync(x => x.Id == id);

            if (song != null)
            {
                trillenceContext.Songs.Remove(song);
                await trillenceContext.SaveChangesAsync();
            }

            return song;
        }
    }
}