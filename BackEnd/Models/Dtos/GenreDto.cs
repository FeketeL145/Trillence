namespace BackEnd.Models.Dtos
{
    public record GenreDto(Guid Id, string? Name, Song? Song);
    public record CreateGenreDto(string? Name);
    public record RemoveGenreDto(Guid Id);
    public record ModifyGenreDto(string? Name);
}