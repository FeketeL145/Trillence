using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IArtistAlbumInterface
    {
        Task<IEnumerable<ArtistAlbum>> GetAll();
        Task<ArtistAlbum> GetById(Guid artistid, Guid albumid);
        Task<ArtistAlbum> Post(CreateArtistAlbumDto createArtistAlbumDto);
        Task<ArtistAlbum> Put(Guid artistid, Guid albumid, ModifyArtistAlbumDto modifyArtistAlbumDto);
        Task<ArtistAlbum> DeleteById(Guid artistid, Guid albumid);
    }
}