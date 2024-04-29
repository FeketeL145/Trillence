using BackEnd.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class PlaylistService : IPlaylistInterface
    {
        private readonly TrillenceContext trillenceContext;

        public PlaylistService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<Playlist> Post(CreatePlaylistDto createPlaylistDto)
        {
            var user = await trillenceContext.Users
                .FirstOrDefaultAsync(u => u.Name == createPlaylistDto.Username);

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            Playlist playlist = new Playlist
            {
                Id = Guid.NewGuid(),
                Name = createPlaylistDto.Name,
                UserId = user.Id,
            };

            await trillenceContext.Playlists.AddAsync(playlist);
            await trillenceContext.SaveChangesAsync();
            return playlist;
        }

        public async Task<IEnumerable<Playlist>> GetAll()
        {
            return await trillenceContext.Playlists.ToListAsync();
        }

        public async Task<Playlist> GetById(Guid id)
        {
            return await trillenceContext.Playlists.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Playlist> Put(Guid id, ModifyPlaylistDto modifyPlaylistDto)
        {
            Playlist? existingPlaylist = await trillenceContext.Playlists.FirstOrDefaultAsync(x => x.Id == id);

            if (existingPlaylist != null)
            {
                existingPlaylist.Name = modifyPlaylistDto.Name;

                trillenceContext.Update(existingPlaylist);
                await trillenceContext.SaveChangesAsync();

                return existingPlaylist;
            }

            return null;
        }

        public async Task<Playlist> DeleteById(Guid id)
        {
            Playlist? playlist = await trillenceContext.Playlists.FirstOrDefaultAsync(x => x.Id == id);

            if (playlist != null)
            {
                var playlistSongs = await trillenceContext.PlaylistSongs
                    .Where(ps => ps.PlaylistId == id)
                    .ToListAsync();

                trillenceContext.PlaylistSongs.RemoveRange(playlistSongs);

                trillenceContext.Playlists.Remove(playlist);

                await trillenceContext.SaveChangesAsync();
            }

            return playlist;
        }
    }
}