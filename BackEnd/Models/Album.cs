namespace BackEnd.Models;

public partial class Album
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public uint? Released { get; set; }

    public virtual ICollection<ArtistAlbum> ArtistAlbums { get; set; } = new List<ArtistAlbum>();

    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();
}