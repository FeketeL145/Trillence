namespace BackEnd.Models;

public partial class Song
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string FileName { get; set; } = null!;
    public string AlbumPhoto {  get; set; } = null!;
    public TimeOnly Length { get; set; }

    public int Listens { get; set; }

    public int Likes { get; set; }
    public int Disikes { get; set; }

    public string Artist { get; set; }

    public string Album { get; set; }

    public string Genre { get; set; }
}