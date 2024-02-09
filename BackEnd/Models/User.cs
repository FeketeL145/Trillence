namespace BackEnd.Models;

public partial class User
{
    /// <summary>
    /// User ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Username.
    /// </summary>
    public string Name { get; set; } = null!;

    public virtual Song Id1 { get; set; } = null!;

    public virtual Playlist Id2 { get; set; } = null!;

    public virtual Album IdNavigation { get; set; } = null!;
}