using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Genre
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual Song IdNavigation { get; set; } = null!;
}
