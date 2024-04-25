using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

public class MusicStreamingService : IMusicStreamingInterface
{
    private readonly string[] _musicFiles;
    private readonly IMemoryCache _cache;
    private readonly TrillenceContext _dbContext;
    private static readonly object _indexLock = new object();
    private SongDetailsForPlayer _previousSongDetails;

    public MusicStreamingService(IMemoryCache memoryCache, TrillenceContext dbContext)
    {
        _cache = memoryCache;
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
        }
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

            int lastBackslashIndex = filePath.LastIndexOf('\\');
            int lastDotIndex = filePath.LastIndexOf('.');
            string actualtitle = filePath.Substring(lastBackslashIndex + 1, lastDotIndex - lastBackslashIndex - 1);

            char[] invalidChars = Path.GetInvalidFileNameChars();
            string sanitizedAlbumName = new string(albumName.Where(c => !invalidChars.Contains(c)).ToArray());

            var song = await _dbContext.Songs
    .Join(
        _dbContext.Albums,
        song => song.AlbumId,
        album => album.Id,
        (song, album) => new { song, album }
    )
    .Join(
        _dbContext.Artists,
        album => album.album.ArtistId,
        artist => artist.Id,
        (songAlbum, artist) => new { songAlbum.song, songAlbum.album, artist }
    )
    .FirstOrDefaultAsync(result =>
        result.artist.Name == artistName &&
        result.album.Name == sanitizedAlbumName &&
        result.song.Name == actualtitle);

            if (song == null)
            {
                throw new InvalidOperationException($"No song found with Artist: {artistName}, Song: {songName}, Album: {albumName}.");
            }

            var songId = song.song.Id;

            return new SongDetailsForPlayer
            {
                ArtistName = artistName,
                SongName = songName,
                AlbumName = sanitizedAlbumName,
                SongId = songId
            };
        }
        else
        {
            throw new InvalidOperationException("Current index is out of bounds.");
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