namespace BackEnd.Models;

public partial class ArtistAlbum
{
    public Guid ArtistId { get; set; }

    public Guid AlbumId { get; set; }

    public virtual Album Album { get; set; } = null!;

    public virtual Artist Artist { get; set; } = null!;
}