using BackEnd.Models;
using BackEnd.Models.Dtos;

namespace BackEnd
{
    public static class Extensions
    {
        public static AlbumDto AsDto(this Album album)
        {
            return new AlbumDto(album.Id, album.Name, album.Released, album.Listens, album.ArtistId, album.SongId, album.IdNavigation, album.Song);
        }

        public static ArtistDto AsDto(this Artist artist)
        {
            return new ArtistDto(artist.Id, artist.AlbumId, artist.IdNavigation, artist.User);
        }

        public static GenreDto GenreDto(this Genre genre)
        {
            return new GenreDto(genre.Id, genre.Name, genre.IdNavigation);
        }

        public static SongDto AsDto(this Song song)
        {
            return new SongDto(song.Id, song.Name, song.Length, song.Listens, song.Likes, song.Dislikes, song.ArtistId, song.AlbumId, song.GenreId, song.Album, song.Artist, song.Genre, song.IdNavigation);
        }

        public static UserDto AsDto(this User user)
        {
            return new UserDto(user.Id, user.Name, user.Password, user.Birth, user.IdNavigation);
        }
    }
}