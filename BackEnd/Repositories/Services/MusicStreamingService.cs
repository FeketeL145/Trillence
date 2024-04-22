using Microsoft.Extensions.Caching.Memory;

public class MusicStreamingService : IMusicStreamingInterface
{
    private readonly string[] _musicFiles;
    private readonly IMemoryCache _cache;
    private static readonly object _indexLock = new object(); // Lock for thread safety

    public MusicStreamingService(IMemoryCache memoryCache)
    {
        _cache = memoryCache;
        string folderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
        _musicFiles = Directory.GetFiles(folderPath, "*.mp3");
        if (_musicFiles.Length == 0)
        {
            throw new FileNotFoundException("No music files found in the folder.");
        }

        // Initialize current index if not already set
        lock (_indexLock) // Ensure thread safety
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
        lock (_indexLock) // Ensure thread safety when accessing index
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
        lock (_indexLock) // Ensure thread safety when updating index
        {
            int currentIndex = _cache.Get<int>("CurrentIndex");
            currentIndex = (currentIndex + 1) % _musicFiles.Length; // Wrap around
            _cache.Set("CurrentIndex", currentIndex); // Update current index in cache
            return _musicFiles[currentIndex];
        }
    }

    public async Task<string> GetPreviousMusicFilePathAsync()
    {
        lock (_indexLock) // Ensure thread safety when updating index
        {
            int currentIndex = _cache.Get<int>("CurrentIndex");
            currentIndex = (currentIndex - 1 + _musicFiles.Length) % _musicFiles.Length; // Wrap around in reverse
            _cache.Set("CurrentIndex", currentIndex); // Update current index in cache
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

            // Log the file metadata to check if album tag is present
            Console.WriteLine($"File: {filePath}");
            Console.WriteLine($"Title: {file.Tag?.Title}");
            Console.WriteLine($"Artist: {file.Tag?.FirstPerformer}");
            Console.WriteLine($"Album: {file.Tag?.Album}");

            // Extract artist, song name, and album name
            string artistName = file.Tag?.FirstPerformer ?? "Unknown Artist";
            string songName = file.Tag?.Title ?? "Unknown Song";
            string albumName = file.Tag?.Album ?? "Unknown Album";

            // Create and return the SongDetails object
            return new SongDetailsForPlayer
            {
                ArtistName = artistName,
                SongName = songName,
                AlbumName = albumName
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

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Music file not found.", filePath);
        }

        return filePath;
    }
}