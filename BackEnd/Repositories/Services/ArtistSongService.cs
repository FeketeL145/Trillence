using BackEnd.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class ArtistSongService : IArtistSongInterface
    {
        private readonly TrillenceContext trillenceContext;

        public ArtistSongService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<ArtistSong> Post(CreateArtistSongDto createArtistSongDto)
        {
            var artistsong = new ArtistSong
            {
                ArtistId = createArtistSongDto.ArtistId,
                SongId = createArtistSongDto.SongId,
            };

            await trillenceContext.ArtistSongs.AddAsync(artistsong);
            await trillenceContext.SaveChangesAsync();
            return artistsong;
        }

        public async Task<IEnumerable<ArtistSong>> GetAll()
        {
            return await trillenceContext.ArtistSongs.ToListAsync();
        }

        public async Task<ArtistSong> GetById(Guid artistid, Guid songid)
        {
            return await trillenceContext.ArtistSongs.FirstOrDefaultAsync(x => x.ArtistId == artistid && x.SongId == songid);
        }

        public async Task<ArtistSong> Put(Guid artistid, Guid songid, ModifyArtistSongDto modifyArtistSongDto)
        {
            var existingArtistSong = await trillenceContext.ArtistSongs.FirstOrDefaultAsync(x => x.ArtistId == artistid && x.SongId == songid);

            if (existingArtistSong != null)
            {
                existingArtistSong.ArtistId = modifyArtistSongDto.ArtistId;
                existingArtistSong.SongId = modifyArtistSongDto.SongId;

                trillenceContext.Update(existingArtistSong);
                await trillenceContext.SaveChangesAsync();

                return existingArtistSong;
            }

            return null;
        }

        public async Task<ArtistSong> DeleteById(Guid artistid, Guid songid)
        {
            var artistsong = await trillenceContext.ArtistSongs.FirstOrDefaultAsync(x => x.ArtistId == artistid && x.SongId == songid);

            if (artistsong != null)
            {
                trillenceContext.ArtistSongs.Remove(artistsong);
                await trillenceContext.SaveChangesAsync();
            }

            return artistsong;
        }
    }
}