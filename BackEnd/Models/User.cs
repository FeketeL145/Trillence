using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual Playlist IdNavigation { get; set; } = null!;
}
