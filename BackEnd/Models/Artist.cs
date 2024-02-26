namespace BackEnd.Models;

public partial class Artist
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual ArtistAlbum? ArtistAlbum { get; set; }

    public virtual ArtistSong? ArtistSong { get; set; }
}