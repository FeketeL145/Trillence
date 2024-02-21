using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class AlbumService : IAlbumInterface
    {
        private readonly TrillenceContext trillenceContext;

        public AlbumService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<AlbumDto> Post(CreateAlbumDto createAlbumDto)
        {
            var album = new Album
            {
                Id = Guid.NewGuid(),
                Name = createAlbumDto.Name,
                Image = createAlbumDto.Image,
                Released = createAlbumDto.Released,
            };

            await trillenceContext.Albums.AddAsync(album);
            await trillenceContext.SaveChangesAsync();
            return album.AsDto();
        }

        public async Task<IEnumerable<Album>> GetAll()
        {
            return await trillenceContext.Albums.ToListAsync();
        }

        public async Task<Album> GetById(Guid id)
        {
            return await trillenceContext.Albums.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<AlbumDto> Put(Guid id, ModifyAlbumDto modifyAlbumDto)
        {
            var existingAlbum = await trillenceContext.Albums.FirstOrDefaultAsync(x => x.Id == id);

            if (existingAlbum != null)
            {
                existingAlbum.Name = modifyAlbumDto.Name;
                existingAlbum.Image = modifyAlbumDto.Image;
                existingAlbum.Released = modifyAlbumDto.Released;

                trillenceContext.Update(existingAlbum);
                await trillenceContext.SaveChangesAsync();

                return existingAlbum.AsDto();
            }

            return null;
        }

        public async Task<Album> DeleteById(Guid id)
        {
            var album = await trillenceContext.Albums.FirstOrDefaultAsync(x => x.Id == id);

            if (album != null)
            {
                trillenceContext.Albums.Remove(album);
                await trillenceContext.SaveChangesAsync();
            }

            return album;
        }
    }
}