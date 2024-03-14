using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class ConnectionService : IConnectionInterface
    {
        private readonly TrillenceContext trillenceContext;
        
        public ConnectionService(TrillenceContext trillencecontext)
        {
            this.trillenceContext = trillencecontext;
        }

        public async Task<object> GetAllSongDetails()
        {
            var data = await trillenceContext.Albums
                .Include(album => album.Songs)
                    .ThenInclude(song => song.ArtistSongs)
                        .ThenInclude(artistSong => artistSong.Artist)
                .ToListAsync();

            var flattenedData = data.Select(album =>
            {
                var mainArtist = trillenceContext.ArtistAlbums
                    .Where(aa => aa.AlbumId == album.Id)
                    .Select(aa => new { artistId = aa.Artist.Id, artistName = aa.Artist.Name })
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
            var data = await trillenceContext.Albums
                .Include(album => album.Songs)
                    .ThenInclude(song => song.ArtistSongs)
                        .ThenInclude(artistSong => artistSong.Artist)
                .ToListAsync();

            var flattenedData = data.Select(album =>
            {
                var mainArtist = trillenceContext.ArtistAlbums
                    .Where(aa => aa.AlbumId == album.Id)
                    .Select(aa => new { artistId = aa.Artist.Id, artistName = aa.Artist.Name })
                    .FirstOrDefault();

                var song = album.Songs.FirstOrDefault(s => s.Id == songId);
                if (song == null)
                {
                    return null;
                }

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
            }).FirstOrDefault();

            return flattenedData;
        }

        public async Task<object> GetAllPlaylistDetails()
        {
            var data = await trillenceContext.Users
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
                        var song = playlistSong.Song;
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
            var playlist = await trillenceContext.Playlists
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