namespace BackEnd.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
}