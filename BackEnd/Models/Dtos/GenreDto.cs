namespace BackEnd.Models.Dtos
{
    public record GenreDto(Guid Id, string Name, Song IdNavigation);
    public record CreateGenreDto(string Name, Song IdNavigation);
    public record RemoveGenreDto(Guid Id);
    public record ModifyGenreDto(string Name, Song IdNavigation);
}