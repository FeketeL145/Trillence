using System;
using System.Collections.Generic;

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
    /// Times someone has listened to the song.
    /// </summary>
    public long Listens { get; set; }

    /// <summary>
    /// Song like amount.
    /// </summary>
    public long Likes { get; set; }

    /// <summary>
    /// Song dislike amount.
    /// </summary>
    public long Dislikes { get; set; }

    /// <summary>
    /// Artist ID.
    /// </summary>
    public Guid ArtistId { get; set; }

    /// <summary>
    /// Album ID.
    /// </summary>
    public Guid AlbumId { get; set; }

    /// <summary>
    /// Genre ID.
    /// </summary>
    public Guid GenreId { get; set; }

    public virtual Album? Album { get; set; }

    public virtual Artist? Artist { get; set; }

    public virtual Genre? Genre { get; set; }

    public virtual Album IdNavigation { get; set; } = null!;
}
