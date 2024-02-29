namespace BackEnd.Models;

public partial class Song
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public TimeSpan? Length { get; set; }

    public Guid AlbumId { get; set; }

    public string Genre { get; set; } = null!;

    public virtual Album Album { get; set; } = null!;

    public virtual ICollection<ArtistSong> ArtistSongs { get; set; } = new List<ArtistSong>();

    public virtual PlaylistSong? PlaylistSong { get; set; }
}