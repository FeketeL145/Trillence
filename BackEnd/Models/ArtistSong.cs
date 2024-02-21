namespace BackEnd.Models;

public partial class ArtistSong
{
    public Guid ArtistId { get; set; }

    public Guid SongId { get; set; }

    public virtual Song? Song { get; set; }
}