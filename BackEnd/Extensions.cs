using BackEnd.Models.Dtos;

namespace BackEnd
{
    public static class Extensions
    {
        public static AlbumDto AsDto(this Album album)
        {
            return new AlbumDto(album.Id, album.Name, album.Image, album.Released, album.UserId, album.IdNavigation, album.User);
        }

        public static GenreDto GenreDto(this Genre genre)
        {
            return new GenreDto(genre.Id, genre.Name, genre.IdNavigation);
        }

        public static SongDto AsDto(this Song song)
        {
            return new SongDto(song.Id, song.Name, song.Length, song.UserId, song.AlbumId, song.GenreId, song.Album, song.Genre, song.IdNavigation, song.User);
        }

        public static UserDto AsDto(this User user)
        {
            return new UserDto(user.Id, user.Name, user.Id1, user.Id2, user.IdNavigation);
        }

        public static PlaylistDto AsDto(this Playlist playlist)
        {
            return new PlaylistDto(playlist.Id, playlist.Name, playlist.UserId, playlist.IdNavigation, playlist.User);
        }

        public static PlaylistSongDto AsDto(this Playlistsong playlistsong)
        {
            return new PlaylistSongDto(playlistsong.SongId, playlistsong.PlaylistId, playlistsong.Playlist, playlistsong.Song);
        }
    }
}