using Microsoft.EntityFrameworkCore;
using TagLib;

namespace BackEnd
{
    public class Mp3MetadataReader
    {
        private readonly TrillenceContext trillenceContext;

        public Mp3MetadataReader(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task ReadMetadata(string filePath)
        {
            filePath = filePath.Trim('"');
            try
            {
                using (var file = TagLib.File.Create(filePath))
                {
                    string titleread = file.Tag.Title;
                    string albumread = file.Tag.Album;
                    string genreread = file.Tag.FirstGenre ?? "Unknown";
                    uint yearread = file.Tag.Year;
                    TimeSpan durationread = file.Properties.Duration;

                    Console.WriteLine("Title: " + titleread);
                    Console.WriteLine("Album: " + albumread);
                    Console.WriteLine("Genre: " + genreread);
                    Console.WriteLine("Year: " + yearread);
                    Console.WriteLine("Duration: " + durationread);

                    if (file.Tag.Pictures != null && file.Tag.Pictures.Length > 0)
                    {
                        IPicture picture = file.Tag.Pictures[0];
                        byte[] pictureData = picture.Data.Data;

                        var album = await trillenceContext.Albums.FirstOrDefaultAsync(a => a.Name == albumread);
                        if (album == null)
                        {
                            album = new Album { Id = Guid.NewGuid(), Name = albumread, Released = yearread };
                            await trillenceContext.Albums.AddAsync(album);

                            string pictureFilePath = Path.ChangeExtension(filePath, ".jpg");
                            System.IO.File.WriteAllBytes(pictureFilePath, pictureData);
                            Microsoft.VisualBasic.FileIO.FileSystem.RenameFile(pictureFilePath, albumread + ".jpg");
                            Console.WriteLine("Album art saved to: " + pictureFilePath);
                        }

                        var song = await trillenceContext.Songs.FirstOrDefaultAsync(s => s.Name == titleread);
                        if (song == null)
                        {
                            song = new Song { Id = Guid.NewGuid(), Name = titleread, Length = durationread, AlbumId = album.Id, Genre = genreread };
                            await trillenceContext.Songs.AddAsync(song);
                        }

                        var contributoryArtists = file.Tag.Performers;
                        foreach (var artistName in contributoryArtists)
                        {
                            var artist = await trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == artistName);
                            if (artist == null)
                            {
                                artist = new Artist { Id = Guid.NewGuid(), Name = artistName };
                                await trillenceContext.Artists.AddAsync(artist);
                            }

                            var artistSongExists = await trillenceContext.ArtistSongs.AnyAsync(s => s.ArtistId == artist.Id && s.SongId == song.Id);
                            if (!artistSongExists)
                            {
                                await trillenceContext.ArtistSongs.AddAsync(new ArtistSong { ArtistId = artist.Id, SongId = song.Id });
                            }
                        }

                        await trillenceContext.SaveChangesAsync();
                    }
                    else
                    {
                        Console.WriteLine("No album art found in the MP3 file.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error has occurred: " + ex.Message);
            }
        }
    }
}