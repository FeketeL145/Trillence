using System;
using System.Collections.Generic;

namespace BackEnd.Models;

public partial class Genre
{
    /// <summary>
    /// Genre ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Genre name.
    /// </summary>
    public string Name { get; set; } = null!;

    public virtual Song IdNavigation { get; set; } = null!;
}
