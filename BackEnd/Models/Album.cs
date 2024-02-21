namespace BackEnd.Models;

public partial class Album
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public DateOnly? Released { get; set; }

    public virtual ArtistAlbum IdNavigation { get; set; } = null!;

    public virtual Song? Song { get; set; }
}