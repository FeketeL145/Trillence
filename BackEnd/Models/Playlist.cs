namespace BackEnd.Models;

public partial class Playlist
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<PlaylistSong> PlaylistSongs { get; set; } = new List<PlaylistSong>();

    public virtual User User { get; set; } = null!;
}