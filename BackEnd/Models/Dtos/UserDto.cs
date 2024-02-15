﻿namespace BackEnd.Models.Dtos
{
    public record UserDto(Guid Id, string? Name, Playlist IdNavigation);
    public record CreateUserDto(string Name);
    public record RemoveUserDto(Guid Id);
    public record ModifyUserDto(string Name);
}