namespace BackEnd.Models;

public partial class Album
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public uint? Released { get; set; }

    public virtual ICollection<ArtistAlbum> ArtistAlbums { get; set; } = new List<ArtistAlbum>();
}