namespace BackEnd.Models;

public partial class Artist
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Album> Albums { get; set; } = new List<Album>();

    public virtual ICollection<ArtistSong> ArtistSongs { get; set; } = new List<ArtistSong>();
}