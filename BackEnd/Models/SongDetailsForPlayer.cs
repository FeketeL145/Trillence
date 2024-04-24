namespace BackEnd.Models
{
    public class SongDetailsForPlayer
    {
        public string ArtistName { get; set; }
        public string SongName { get; set; }
        public string AlbumName { get; set; }
        public Guid SongId { get; set; }
    }
}