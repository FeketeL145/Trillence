using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

public class MusicStreamingService : IMusicStreamingInterface
{
    private readonly string[] _musicFiles;
    private readonly IMemoryCache _cache;
    private readonly IMemoryCache _playlistcache;
    private readonly TrillenceContext _dbContext;
    private static readonly object _indexLock = new object();
    private SongDetailsForPlayer _previousSongDetails;

    public MusicStreamingService(IMemoryCache memoryCache, TrillenceContext dbContext)
    {
        _cache = memoryCache;
        _playlistcache = memoryCache;
        _dbContext = dbContext;
        string folderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
        _musicFiles = Directory.GetFiles(folderPath, "*.mp3");

        if (_musicFiles.Length == 0)
        {
            throw new FileNotFoundException("No music files found in the folder.");
        }

        lock (_indexLock)
        {
            if (!_cache.TryGetValue("CurrentIndex", out int currentIndex))
            {
                currentIndex = 0;
                _cache.Set("CurrentIndex", currentIndex);
            }
            if (!_playlistcache.TryGetValue("CurrentIndex", out int playlistCurrentIndex))
            {
                currentIndex = 0;
                _playlistcache.Set("CurrentIndex", playlistCurrentIndex);
            }
        }
    }

    public async Task<string> GetMusicFilePathAsync(string fileName)
    {
        string filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyMusic), fileName);

        if (!System.IO.File.Exists(filePath))
        {
            throw new FileNotFoundException("Music file not found.", filePath);
        }

        return filePath;
    }

    public async Task<string> GetCurrentMusicFilePathAsync()
    {
        lock (_indexLock)
        {
            int currentIndex = _cache.Get<int>("CurrentIndex");
            if (currentIndex >= 0 && currentIndex < _musicFiles.Length)
            {
                return _musicFiles[currentIndex];
            }
            throw new InvalidOperationException("Current music file is out of bounds.");
        }
    }

    public async Task<string> GetNextMusicFilePathAsync()
    {
        lock (_indexLock)
        {
            int currentIndex = _cache.Get<int>("CurrentIndex");
            currentIndex = (currentIndex + 1) % _musicFiles.Length;
            _cache.Set("CurrentIndex", currentIndex);
            return _musicFiles[currentIndex];
        }
    }

    public async Task<string> GetPreviousMusicFilePathAsync()
    {
        lock (_indexLock)
        {
            int currentIndex = _cache.Get<int>("CurrentIndex");
            currentIndex = (currentIndex - 1 + _musicFiles.Length) % _musicFiles.Length;
            _cache.Set("CurrentIndex", currentIndex);
            return _musicFiles[currentIndex];
        }
    }

    public async Task<ICollection<Song>> GetSongsFromPlaylistAsync(Guid playlistId)
    {
        return await _dbContext.PlaylistSongs
            .Where(ps => ps.PlaylistId == playlistId)
            .Select(ps => ps.Song)
            .ToListAsync();
    }

    public async Task<string> GetCurrentMusicFilePathFromPlaylistAsync(Guid playlistId)
    {
        var songs = await GetSongsFromPlaylistAsync(playlistId);
        string cacheKey = $"Playlist_{playlistId}_Index";
        int playlistCurrentIndex = _playlistcache.GetOrCreate(cacheKey, entry => 0);

        if (playlistCurrentIndex >= 0 && playlistCurrentIndex < songs.Count)
        {
            var currentSong = songs.ElementAt(playlistCurrentIndex);
            return GetMusicFilePath(currentSong.Name);
        }

        throw new InvalidOperationException("Invalid song index.");
    }

    public async Task<string> GetNextMusicFilePathFromPlaylistAsync(Guid playlistId)
    {
        var songs = await GetSongsFromPlaylistAsync(playlistId);

        int playlistCurrentIndex = _playlistcache.Get<int>($"Playlist_{playlistId}_Index");
        playlistCurrentIndex = (playlistCurrentIndex + 1) % songs.Count;
        _playlistcache.Set($"Playlist_{playlistId}_Index", playlistCurrentIndex);
        var currentSong = songs.ElementAt(playlistCurrentIndex);
        return GetMusicFilePath(currentSong.Name);
    }

    public async Task<string> GetPreviousMusicFilePathFromPlaylistAsync(Guid playlistId)
    {
        var songs = await GetSongsFromPlaylistAsync(playlistId);

        int playlistCurrentIndex = _playlistcache.Get<int>($"Playlist_{playlistId}_Index");
        playlistCurrentIndex = (playlistCurrentIndex - 1 + songs.Count) % songs.Count;
        _playlistcache.Set($"Playlist_{playlistId}_Index", playlistCurrentIndex);
        var currentSong = songs.ElementAt(playlistCurrentIndex);
        return GetMusicFilePath(currentSong.Name);
    }

    public async Task<SongDetailsForPlayer> GetCurrentSongDetailsAsync()
    {
        int currentIndex = _cache.Get<int>("CurrentIndex");
        if (currentIndex >= 0 && currentIndex < _musicFiles.Length)
        {
            string filePath = _musicFiles[currentIndex];
            TagLib.File file = TagLib.File.Create(filePath);

            string artistName = file.Tag?.FirstPerformer ?? "Unknown Artist";
            string songName = file.Tag?.Title ?? "Unknown Song";
            string albumName = file.Tag?.Album ?? "Unknown Album";

            var song = await _dbContext.Songs
                .Where(s => s.Name == songName)
                .FirstOrDefaultAsync();

            if (song == null)
            {
                throw new InvalidOperationException($"No song found with Artist: {artistName}, Song: {songName}, Album: {albumName}.");
            }

            return new SongDetailsForPlayer
            {
                ArtistName = artistName,
                SongName = songName,
                AlbumName = albumName,
                SongId = song.Id
            };
        }
        else
        {
            throw new InvalidOperationException("Current index is out of bounds.");
        }
    }

    public async Task<SongDetailsForPlayer> GetCurrentPlaylistSongDetailsAsync(Guid playlistId)
    {
        string cacheKey = $"Playlist_{playlistId}_Index";
        int playlistCurrentIndex = _playlistcache.GetOrCreate(cacheKey, entry => 0);

        var playlistSongs = await GetSongsFromPlaylistAsync(playlistId);

        if (playlistCurrentIndex >= 0 && playlistCurrentIndex < playlistSongs.Count)
        {
            var currentSong = playlistSongs.ElementAt(playlistCurrentIndex);
            string filePath = GetMusicFilePath(currentSong.Name);

            if (!System.IO.File.Exists(filePath))
            {
                throw new FileNotFoundException("Music file not found.", filePath);
            }

            TagLib.File file = TagLib.File.Create(filePath);

            string artistName = file.Tag?.FirstPerformer ?? "Unknown Artist";
            string songName = file.Tag?.Title ?? "Unknown Song";
            string albumName = file.Tag?.Album ?? "Unknown Album";

            string fileName = file.Name ?? "Unknown Filename";
            int lastSlashIndex = fileName.LastIndexOf("\\");
            fileName = fileName.Substring(lastSlashIndex + 1);
            int lastDotIndex = fileName.LastIndexOf('.');
            fileName = fileName.Substring(0, lastDotIndex);

            var song = await _dbContext.Songs
                .FirstOrDefaultAsync(s => s.Name == fileName);

            if (song == null)
            {
                throw new InvalidOperationException($"No song found with Artist: {artistName}, Song: {songName}, Album: {albumName}.");
            }

            return new SongDetailsForPlayer
            {
                ArtistName = artistName,
                SongName = songName,
                AlbumName = albumName,
                SongId = song.Id
            };
        }
        else
        {
            throw new InvalidOperationException("Invalid song index.");
        }
    }

    private string GetMusicFilePath(string songName)
    {
        string folderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
        return Path.Combine(folderPath, $"{songName}.mp3");
    }

    public async Task<SongDetailsForPlayer> GetUniqueSongDetailsAsync()
    {
        SongDetailsForPlayer currentSongDetails;
        do
        {
            currentSongDetails = await GetCurrentSongDetailsAsync();
        } while (IsSameAsPrevious(currentSongDetails));

        _previousSongDetails = currentSongDetails;
        return currentSongDetails;
    }

    private bool IsSameAsPrevious(SongDetailsForPlayer currentSongDetails)
    {
        return _previousSongDetails != null &&
               _previousSongDetails.ArtistName == currentSongDetails.ArtistName &&
               _previousSongDetails.SongName == currentSongDetails.SongName &&
               _previousSongDetails.AlbumName == currentSongDetails.AlbumName;
    }
}