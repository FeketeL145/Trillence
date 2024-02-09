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

    public string Image { get; set; } = null!;

    /// <summary>
    /// Album release date.
    /// </summary>
    public DateOnly Released { get; set; }

    /// <summary>
    /// User ID.
    /// </summary>
    public Guid UserId { get; set; }

    public virtual Song IdNavigation { get; set; } = null!;

    public virtual User? User { get; set; }
}