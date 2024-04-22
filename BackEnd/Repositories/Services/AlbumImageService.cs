namespace BackEnd.Repositories.Services
{
    public class AlbumImageService : IAlbumImageInterface
    {
        private readonly string musicFolderPath;

        public AlbumImageService()
        {
            musicFolderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
        }

        public byte[] GetAlbumImage(string albumName)
        {
            try
            {
                string imagePath = Path.Combine(musicFolderPath, $"{albumName}.jpg");

                if (!File.Exists(imagePath))
                {
                    imagePath = Path.Combine(musicFolderPath, $"{albumName}.png");

                    if (!File.Exists(imagePath))
                    {
                        return null;
                    }
                }

                return File.ReadAllBytes(imagePath);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}