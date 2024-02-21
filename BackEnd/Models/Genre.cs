namespace BackEnd.Models;

public partial class Genre
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual Song? Song { get; set; }
}