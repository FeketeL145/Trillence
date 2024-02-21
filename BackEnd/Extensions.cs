using BackEnd.Models.Dtos;

namespace BackEnd
{
    public static class Extensions
    {
        public static AlbumDto AsDto(this Album album)
        {
            return new AlbumDto(album.Id, album.Name, album.Image, album.Released, album.IdNavigation, album.Song);
        }

        public static ArtistAlbumDto AsDto(this ArtistAlbum artistAlbum)
        {
            return new ArtistAlbumDto(artistAlbum.ArtistId, artistAlbum.AlbumId, artistAlbum.Album);
        }

        public static ArtistDto AsDto(this Artist artist)
        {
            return new ArtistDto(artist.Id, artist.Name);
        }

        public static ArtistSongDto AsDto(this ArtistSong artistSong)
        {
            return new ArtistSongDto(artistSong.ArtistId, artistSong.SongId, artistSong.Song);
        }

        public static GenreDto GenreDto(this Genre genre)
        {
            return new GenreDto(genre.Id, genre.Name, genre.Song);
        }

        public static PlaylistDto AsDto(this Playlist playlist)
        {
            return new PlaylistDto(playlist.Id, playlist.UserId, playlist.Name, playlist.User);
        }

        public static PlaylistSongDto AsDto(this PlaylistSong playlistsong)
        {
            return new PlaylistSongDto(playlistsong.PlaylistId, playlistsong.SongId, playlistsong.Song);
        }

        public static SongDto AsDto(this Song song)
        {
            return new SongDto(song.Id, song.Name, song.Length, song.AlbumId, song.GenreId, song.Album, song.Genre, song.Id1, song.IdNavigation);
        }

        public static UserDto AsDto(this User user)
        {
            return new UserDto(user.Id, user.Name, user.Playlist);
        }
    }
}