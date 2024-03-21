namespace BackEnd.Models;

public partial class Album
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public uint? Released { get; set; }

    public Guid ArtistId { get; set; }

    public virtual Artist Artist { get; set; } = null!;

    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();
}