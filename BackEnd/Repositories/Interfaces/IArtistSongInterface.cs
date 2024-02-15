using BackEnd.Models.Dtos;
using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces
{
    public interface IArtistSongInterface
    {
        Task<IEnumerable<ArtistSong>> GetAll();
        Task<ArtistSong> GetById(Guid artistid, Guid songid);
        Task<ArtistSong> Post(CreateArtistSongDto createArtistSongDto);
        Task<ArtistSong> Put(Guid artistid, Guid songid, ModifyArtistSongDto modifyArtistSongDto);
        Task<ArtistSong> DeleteById(Guid artistid, Guid songid);
    }
}