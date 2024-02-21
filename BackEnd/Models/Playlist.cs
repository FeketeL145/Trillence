namespace BackEnd.Models;

public partial class Playlist
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string? Name { get; set; }

    public virtual User User { get; set; } = null!;
}