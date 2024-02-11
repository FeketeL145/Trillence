namespace BackEnd.Models.Dtos
{
    public record SongDto(Guid Id, string Name, string FileName, string AlbumPhoto ,TimeOnly Length, int Listens, int Likes, int Dislikes, string Artist, string Album, string Genre);
    public record CreateSongDto(string Name, TimeOnly Length);
    public record RemoveSongDto(Guid Id);
    public record ModifySongDto(string Name, TimeOnly Length);
}