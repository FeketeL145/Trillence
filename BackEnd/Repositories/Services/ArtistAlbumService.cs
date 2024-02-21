using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class ArtistAlbumService : IArtistAlbumInterface
    {
        private readonly TrillenceContext trillenceContext;

        public ArtistAlbumService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<ArtistAlbum> Post(CreateArtistAlbumDto createArtistAlbumDto)
        {
            var artistalbum = new ArtistAlbum
            {
                ArtistId = createArtistAlbumDto.ArtistId,
                AlbumId = createArtistAlbumDto.AlbumId,
            };

            await trillenceContext.ArtistAlbums.AddAsync(artistalbum);
            await trillenceContext.SaveChangesAsync();
            return artistalbum;
        }

        public async Task<IEnumerable<ArtistAlbum>> GetAll()
        {
            return await trillenceContext.ArtistAlbums.ToListAsync();
        }

        public async Task<ArtistAlbum> GetById(Guid artistid, Guid albumid)
        {
            return await trillenceContext.ArtistAlbums.FirstOrDefaultAsync(x => x.ArtistId == artistid && x.AlbumId == albumid);
        }

        public async Task<ArtistAlbum> Put(Guid artistid, Guid albumid, ModifyArtistAlbumDto modifyArtistAlbumDto)
        {
            var existingArtistAlbum = await trillenceContext.ArtistAlbums.FirstOrDefaultAsync(x => x.ArtistId == artistid && x.AlbumId == albumid);

            if (existingArtistAlbum != null)
            {
                existingArtistAlbum.ArtistId = modifyArtistAlbumDto.ArtistId;
                existingArtistAlbum.AlbumId = modifyArtistAlbumDto.AlbumId;

                trillenceContext.Update(existingArtistAlbum);
                await trillenceContext.SaveChangesAsync();

                return existingArtistAlbum;
            }

            return null;
        }

        public async Task<ArtistAlbum> DeleteById(Guid artistid, Guid albumid)
        {
            var artistalbum = await trillenceContext.ArtistAlbums.FirstOrDefaultAsync(x => x.ArtistId == artistid && x.AlbumId == albumid);

            if (artistalbum != null)
            {
                trillenceContext.ArtistAlbums.Remove(artistalbum);
                await trillenceContext.SaveChangesAsync();
            }

            return artistalbum;
        }
    }
}