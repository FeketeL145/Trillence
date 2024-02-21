namespace BackEnd.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual Playlist? Playlist { get; set; }
}