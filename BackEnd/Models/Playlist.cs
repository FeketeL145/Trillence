namespace BackEnd.Models;

public partial class Playlist
{
    /// <summary>
    /// Playlist ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// User ID.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Name of playlist.
    /// </summary>
    public string Name { get; set; } = null!;

    public virtual Playlistsong IdNavigation { get; set; } = null!;

    public virtual User? User { get; set; }
}