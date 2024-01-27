using System;
using System.Collections.Generic;

namespace BackEnd.Models;

public partial class Album
{
    /// <summary>
    /// Album ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Album name.
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Album release date.
    /// </summary>
    public DateOnly Released { get; set; }

    /// <summary>
    /// Times somebody has listened to any of the songs from the album.
    /// </summary>
    public long Listens { get; set; }

    /// <summary>
    /// Artist ID.
    /// </summary>
    public Guid ArtistId { get; set; }

    /// <summary>
    /// Song ID.
    /// </summary>
    public Guid SongId { get; set; }

    public virtual Song IdNavigation { get; set; } = null!;

    public virtual Song? Song { get; set; }
}
