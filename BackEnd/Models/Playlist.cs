using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Playlist
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public string? Name { get; set; }

    public virtual PlaylistSong IdNavigation { get; set; } = null!;

    public virtual User? User { get; set; }
}
