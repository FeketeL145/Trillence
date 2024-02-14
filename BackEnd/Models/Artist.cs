using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Artist
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual ArtistSong Id1 { get; set; } = null!;

    public virtual ArtistAlbum IdNavigation { get; set; } = null!;
}
