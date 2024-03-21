namespace BackEnd.Models;

public partial class ArtistSong
{
    public long Id { get; set; }

    public Guid ArtistId { get; set; }

    public Guid SongId { get; set; }

    public virtual Artist Artist { get; set; } = null!;

    public virtual Song Song { get; set; } = null!;
}