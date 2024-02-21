﻿using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
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
            var playlist = new Playlist
            {
                Id = Guid.NewGuid(),
                Name = createPlaylistDto.Name,
                UserId = createPlaylistDto.UserId,
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
            var existingPlaylist = await trillenceContext.Playlists.FirstOrDefaultAsync(x => x.Id == id);

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
            var playlist = await trillenceContext.Playlists.FirstOrDefaultAsync(x => x.Id == id);

            if (playlist != null)
            {
                trillenceContext.Playlists.Remove(playlist);
                await trillenceContext.SaveChangesAsync();
            }

            return playlist;
        }
    }
}