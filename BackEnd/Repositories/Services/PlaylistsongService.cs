using BackEnd.Models.Dtos;
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

        public async Task<PlaylistSong> Post(CreatePlaylistSongDto createPlaylistsongDto)
        {
            var playlistsong = new PlaylistSong
            {
                SongId = createPlaylistsongDto.SongId,
                PlaylistId = createPlaylistsongDto.PlaylistId,
            };

            await trillenceContext.PlaylistSongs.AddAsync(playlistsong);
            await trillenceContext.SaveChangesAsync();
            return playlistsong;
        }

        public async Task<IEnumerable<PlaylistSong>> GetAll()
        {
            return await trillenceContext.PlaylistSongs.ToListAsync();
        }

        public async Task<PlaylistSong> GetById(Guid playlistid, Guid songid)
        {
            return await trillenceContext.PlaylistSongs.FirstOrDefaultAsync(x => x.PlaylistId == playlistid && x.SongId == songid);
        }

        public async Task<PlaylistSong> Put(Guid playlistid, Guid songid, ModifyPlaylistSongDto modifyPlaylistsongDto)
        {
            var existingPlaylistsong = await trillenceContext.PlaylistSongs.FirstOrDefaultAsync(x => x.PlaylistId == playlistid && x.SongId == songid);

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

        public async Task<PlaylistSong> DeleteById(Guid playlistid, Guid songid)
        {
            var playlistsong = await trillenceContext.PlaylistSongs.FirstOrDefaultAsync(x => x.PlaylistId == playlistid && x.SongId == songid);

            if (playlistsong != null)
            {
                trillenceContext.PlaylistSongs.Remove(playlistsong);
                await trillenceContext.SaveChangesAsync();
            }

            return playlistsong;
        }
    }
}