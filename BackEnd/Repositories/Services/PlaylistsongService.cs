using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class PlaylistsongService : IPlaylistsongInterface
    {
        private readonly TrillenceContext trillenceContext;

        public PlaylistsongService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<Playlistsong> Post(CreatePlaylistSongDto createPlaylistsongDto)
        {
            var playlistsong = new Playlistsong
            {
                SongId = createPlaylistsongDto.SongId,
                PlaylistId = createPlaylistsongDto.PlaylistId,
            };

            await trillenceContext.Playlistsongs.AddAsync(playlistsong);
            await trillenceContext.SaveChangesAsync();
            return playlistsong;
        }

        public async Task<IEnumerable<Playlistsong>> GetAll()
        {
            return await trillenceContext.Playlistsongs.ToListAsync();
        }

        public async Task<Playlistsong> GetById(Guid playlistid, Guid songid)
        {
            return await trillenceContext.Playlistsongs.FirstOrDefaultAsync(x => x.PlaylistId == playlistid && x.SongId == songid);
        }

        public async Task<Playlistsong> Put(Guid playlistid, Guid songid, ModifyPlaylistSongDto modifyPlaylistsongDto)
        {
            var existingPlaylistsong = await trillenceContext.Playlistsongs.FirstOrDefaultAsync(x => x.PlaylistId == playlistid && x.SongId == songid);

            if (existingPlaylistsong != null)
            {
                existingPlaylistsong.PlaylistId = modifyPlaylistsongDto.PlaylistId;
                existingPlaylistsong.SongId = modifyPlaylistsongDto.SongId;

                trillenceContext.Update(existingPlaylistsong);
                await trillenceContext.SaveChangesAsync();

                return existingPlaylistsong;
            }

            return null;
        }

        public async Task<Playlistsong> DeleteById(Guid playlistid, Guid songid)
        {
            var playlistsong = await trillenceContext.Playlistsongs.FirstOrDefaultAsync(x => x.PlaylistId == playlistid && x.SongId == songid);

            if (playlistsong != null)
            {
                trillenceContext.Playlistsongs.Remove(playlistsong);
                await trillenceContext.SaveChangesAsync();
            }

            return playlistsong;
        }
    }
}