public class MusicStreamingService : IMusicStreamingInterface
{
    private readonly string _musicFolderPath;

    public MusicStreamingService()
    {
        _musicFolderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
    }

    public async Task<string> GetMusicFilePathAsync(string fileName)
    {
        string filePath = Path.Combine(_musicFolderPath, fileName);

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Music file not found.", filePath);
        }

        return filePath;
    }
}