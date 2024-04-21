using BackEnd.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class ArtistService : IArtistInterface
    {
        private readonly TrillenceContext trillenceContext;

        public ArtistService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<ArtistDto> Post(CreateArtistDto createArtistDto)
        {
            Artist artist = new Artist
            {
                Id = Guid.NewGuid(),
                Name = createArtistDto.Name,
            };

            await trillenceContext.Artists.AddAsync(artist);
            await trillenceContext.SaveChangesAsync();
            return artist.AsDto();
        }

        public async Task<IEnumerable<Artist>> GetAll()
        {
            return await trillenceContext.Artists.ToListAsync();
        }

        public async Task<Artist> GetById(Guid id)
        {
            return await trillenceContext.Artists.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ArtistDto> Put(Guid id, ModifyArtistDto modifyArtistDto)
        {
            Artist? existingArtist = await trillenceContext.Artists.FirstOrDefaultAsync(x => x.Id == id);

            if (existingArtist != null)
            {
                existingArtist.Name = modifyArtistDto.Name;

                trillenceContext.Update(existingArtist);
                await trillenceContext.SaveChangesAsync();

                return existingArtist.AsDto();
            }

            return null;
        }

        public async Task<Artist> DeleteById(Guid id)
        {
            Artist? artist = await trillenceContext.Artists.FirstOrDefaultAsync(x => x.Id == id);

            if (artist != null)
            {
                trillenceContext.Artists.Remove(artist);
                await trillenceContext.SaveChangesAsync();
            }

            return artist;
        }
    }
}