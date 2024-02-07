namespace BackEnd.Models;

public partial class Artist
{
    /// <summary>
    /// Artist ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Album ID.
    /// </summary>
    public Guid AlbumId { get; set; }

    public virtual Song IdNavigation { get; set; } = null!;

    public virtual User? User { get; set; }
}