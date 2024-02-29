using BackEnd.Models.Dtos;
using System;
using System.IO;
using TagLib;

public class Mp3MetadataReader
{
    public static void ReadMetadata(string filePath)
    {
        try
        {
            var file = TagLib.File.Create(filePath);

            string titleread = file.Tag.Title;
            string artistread = file.Tag.FirstPerformer;
            string albumread = file.Tag.Album;
            string genreread = file.Tag.FirstGenre;
            uint yearread = file.Tag.Year;
            TimeSpan durationread = file.Properties.Duration;

            Console.WriteLine("Title: " + titleread);
            Console.WriteLine("Artist: " + artistread);
            Console.WriteLine("Album: " + albumread);
            Console.WriteLine("Genre: " + genreread);
            Console.WriteLine("Year: " + yearread);
            Console.WriteLine("Duration: " + durationread);

            /*var artist = new Artist
            {
                Id = Guid.NewGuid(),
                Name = artistread,
            };

            var album = new Album
            {
                Id = Guid.NewGuid(),
                Name = albumread,
                Image = createAlbumDto.Image,
                Released = yearread,
            };

            var artist = new Artist
            {
                Id = Guid.NewGuid(),
                Name = artistread,
            };

            var song = new Song
            {
                Id = Guid.NewGuid(),
                Name = titleread,
                Length = durationread,
                AlbumId = album.Id,
                Genre = genreread,
            };*/
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error has occurred: " + ex.Message);
        }
    }
}