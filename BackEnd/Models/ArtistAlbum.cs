using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class ArtistAlbum
{
    public Guid ArtistId { get; set; }

    public Guid AlbumId { get; set; }

    public virtual Artist? Artist { get; set; }
}
