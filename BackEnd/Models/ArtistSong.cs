using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class ArtistSong
{
    public Guid ArtistId { get; set; }

    public Guid SongId { get; set; }

    public virtual Artist? Artist { get; set; }

    public virtual Song? Song { get; set; }
}
