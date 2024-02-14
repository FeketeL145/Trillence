﻿using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class PlaylistSong
{
    public Guid PlaylistId { get; set; }

    public Guid SongId { get; set; }

    public virtual Playlist? Playlist { get; set; }

    public virtual Song? Song { get; set; }
}