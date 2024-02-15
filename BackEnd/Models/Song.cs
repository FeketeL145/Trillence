namespace BackEnd.Models;

public partial class Song
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public TimeOnly? Length { get; set; }

    public Guid? AlbumId { get; set; }

    public Guid? GenreId { get; set; }

    public virtual Album? Album { get; set; }

    public virtual Genre? Genre { get; set; }

    public virtual PlaylistSong Id1 { get; set; } = null!;

    public virtual ArtistSong IdNavigation { get; set; } = null!;
}