namespace BackEnd.Models;

public partial class Playlistsong
{
    /// <summary>
    /// Song ID.
    /// </summary>
    public Guid SongId { get; set; }

    /// <summary>
    /// Playlist ID.
    /// </summary>
    public Guid PlaylistId { get; set; }

    public virtual Playlist? Playlist { get; set; }

    public virtual Song? Song { get; set; }
}