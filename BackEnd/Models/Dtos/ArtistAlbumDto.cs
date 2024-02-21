﻿namespace BackEnd.Models.Dtos
{
    public record ArtistAlbumDto(Guid ArtistId, Guid AlbumId, Album? Album);
    public record CreateArtistAlbumDto(Guid ArtistId, Guid AlbumId);
    public record RemoveArtistAlbumDto(Guid ArtistId, Guid AlbumId);
    public record ModifyArtistAlbumDto(Guid AlbumId, Guid ArtistId);
}