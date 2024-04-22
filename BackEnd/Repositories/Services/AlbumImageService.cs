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
                // Assuming your image files are in the format "albumname.jpg" or "albumname.png"
                string imagePath = Path.Combine(musicFolderPath, $"{albumName}.jpg");

                if (!File.Exists(imagePath))
                {
                    // Try with .png extension
                    imagePath = Path.Combine(musicFolderPath, $"{albumName}.png");

                    if (!File.Exists(imagePath))
                    {
                        return null; // Image not found
                    }
                }

                // Return the image file as byte array
                return File.ReadAllBytes(imagePath);
            }
            catch (Exception ex)
            {
                // Log the error
                return null;
            }
        }
    }
}