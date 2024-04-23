using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class ConnectionService : IConnectionInterface
    {
        private readonly TrillenceContext _trillenceContext;

        public ConnectionService(TrillenceContext trillenceContext)
        {
            _trillenceContext = trillenceContext;
        }

        public async Task<object> GetAllSongDetails()
        {
            List<Album> data = await _trillenceContext.Albums
                .Include(album => album.Songs)
                    .ThenInclude(song => song.ArtistSongs)
                        .ThenInclude(artistSong => artistSong.Artist)
                .ToListAsync();

            var flattenedData = data.Select(album =>
            {
                var mainArtist = _trillenceContext.Artists
                    .Where(artist => artist.Id == album.ArtistId)
                    .Select(artist => new { artistId = artist.Id, artistName = artist.Name })
                    .FirstOrDefault();

                var songs = album.Songs.Select(song =>
                {
                    var contributoryArtists = song.ArtistSongs
                        .Where(artistSong => artistSong.ArtistId != mainArtist.artistId)
                        .Select(artistSong => new { artistId = artistSong.Artist.Id, artistName = artistSong.Artist.Name })
                        .ToList();

                    var contributoryArtistsSection = contributoryArtists.Any() ? contributoryArtists : null;

                    return new
                    {
                        songId = song.Id,
                        songName = song.Name,
                        songLength = song.Length,
                        songGenre = song.Genre,
                        contributoryArtists = contributoryArtistsSection
                    };
                }).ToList();

                return new
                {
                    albumId = album.Id,
                    albumName = album.Name,
                    albumReleased = album.Released,
                    mainArtist = mainArtist,
                    songs = songs
                };
            });

            return flattenedData.ToList();
        }

        public async Task<object> GetSongDetailsById(Guid songId)
        {
            Song? songData = await _trillenceContext.Songs
        .Include(song => song.Album)
            .ThenInclude(album => album.Artist)
        .Include(song => song.ArtistSongs)
            .ThenInclude(artistSong => artistSong.Artist)
        .FirstOrDefaultAsync(song => song.Id == songId);

            if (songData == null)
            {
                return null;
            }

            var mainArtist = new
            {
                artistId = songData.Album.Artist.Id,
                artistName = songData.Album.Artist.Name
            };

            var contributoryArtists = songData.ArtistSongs
                .Where(artistSong => artistSong.ArtistId != mainArtist.artistId)
                .Select(artistSong => new
                {
                    artistId = artistSong.Artist.Id,
                    artistName = artistSong.Artist.Name
                })
                .ToList();

            var contributoryArtistsSection = contributoryArtists.Any() ? contributoryArtists : null;

            var songDetails = new
            {
                songId = songData.Id,
                songName = songData.Name,
                songLength = songData.Length,
                songGenre = songData.Genre,
                albumId = songData.Album.Id,
                albumName = songData.Album.Name,
                albumReleased = songData.Album.Released,
                mainArtist = mainArtist,
                contributoryArtists = contributoryArtistsSection
            };

            return songDetails;
        }

        public async Task<object> GetSongDetailsByName(string songName)
        {
            Song? songData = await _trillenceContext.Songs
        .Include(song => song.Album)
            .ThenInclude(album => album.Artist)
        .Include(song => song.ArtistSongs)
            .ThenInclude(artistSong => artistSong.Artist)
        .FirstOrDefaultAsync(song => song.Name == songName);

            if (songData == null)
            {
                return null;
            }

            var mainArtist = new
            {
                artistId = songData.Album.Artist.Id,
                artistName = songData.Album.Artist.Name
            };

            var contributoryArtists = songData.ArtistSongs
                .Where(artistSong => artistSong.ArtistId != mainArtist.artistId)
                .Select(artistSong => new
                {
                    artistId = artistSong.Artist.Id,
                    artistName = artistSong.Artist.Name
                })
                .ToList();

            var contributoryArtistsSection = contributoryArtists.Any() ? contributoryArtists : null;

            var songDetails = new
            {
                songId = songData.Id,
                songName = songData.Name,
                songLength = songData.Length,
                songGenre = songData.Genre,
                albumId = songData.Album.Id,
                albumName = songData.Album.Name,
                albumReleased = songData.Album.Released,
                mainArtist = mainArtist,
                contributoryArtists = contributoryArtistsSection
            };

            return songDetails;
        }

        public async Task<object> GetAllPlaylistDetails()
        {
            List<User> data = await _trillenceContext.Users
                .Include(user => user.Playlists)
                    .ThenInclude(playlist => playlist.PlaylistSongs)
                        .ThenInclude(playlistSong => playlistSong.Song)
                .ToListAsync();

            var groupedData = data.Select(user =>
            {
                var playlists = user.Playlists.Select(playlist =>
                {
                    var songs = playlist.PlaylistSongs.Select(playlistSong =>
                    {
                        Song song = playlistSong.Song;
                        return new
                        {
                            songId = song.Id,
                            songName = song.Name
                        };
                    }).ToList();

                    return new
                    {
                        playlistId = playlist.Id,
                        playlistName = playlist.Name,
                        songs = songs
                    };
                }).ToList();

                return new
                {
                    userId = user.Id,
                    userName = user.Name,
                    playlists = playlists
                };
            });

            return groupedData.ToList();
        }

        public async Task<object> GetPlaylistDetailsById(Guid playlistId)
        {
            Playlist? playlist = await _trillenceContext.Playlists
                .Include(p => p.User)
                .Include(p => p.PlaylistSongs)
                    .ThenInclude(ps => ps.Song)
                .FirstOrDefaultAsync(p => p.Id == playlistId);

            if (playlist == null)
            {
                return $"Playlist with the ID {playlistId} could not be found!";
            }

            var songs = playlist.PlaylistSongs.Select(ps => new
            {
                songId = ps.Song.Id,
                songName = ps.Song.Name
            }).ToList();

            return new
            {
                playlistId = playlist.Id,
                playlistName = playlist.Name,
                user = new
                {
                    userId = playlist.User.Id,
                    userName = playlist.User.Name
                },
                songs = songs
            };
        }
    }
}