namespace BackEnd.Models;

public partial class Song
{
    /// <summary>
    /// Song ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Song name.
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Song length.
    /// </summary>
    public TimeOnly Length { get; set; }

    /// <summary>
    /// User ID.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Album ID.
    /// </summary>
    public Guid AlbumId { get; set; }

    /// <summary>
    /// Genre ID.
    /// </summary>
    public Guid GenreId { get; set; }

    public virtual Album? Album { get; set; }

    public virtual Genre? Genre { get; set; }

    public virtual Playlistsong IdNavigation { get; set; } = null!;

    public virtual User? User { get; set; }
}