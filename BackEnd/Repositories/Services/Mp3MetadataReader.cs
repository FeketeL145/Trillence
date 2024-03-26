using Microsoft.EntityFrameworkCore;
using TagLib;

namespace BackEnd
{
    public class Mp3MetadataReader
    {
        private readonly TrillenceContext _trillenceContext;

        public Mp3MetadataReader(TrillenceContext trillenceContext)
        {
            _trillenceContext = trillenceContext;
        }

        public async Task ReadMetadata()
        {
            try
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                string folderPath = config["Paths:SongFolder"];
                folderPath = folderPath.Trim('"');
                var files = Directory.EnumerateFiles(folderPath)
                                    .Where(file => file.ToLower().EndsWith(".mp3"));

                foreach (var filePath in files)
                {
                    using (var file = TagLib.File.Create(filePath))
                    {
                        string titleread = file.Tag.Title;
                        string albumread = file.Tag.Album;
                        string genreread = file.Tag.FirstGenre ?? "Unknown";
                        uint yearread = file.Tag.Year;
                        TimeSpan durationread = file.Properties.Duration;
                        string artistread = file.Tag.FirstAlbumArtist;

                        Console.WriteLine("Title: " + titleread);
                        Console.WriteLine("Album: " + albumread);
                        Console.WriteLine("Genre: " + genreread);
                        Console.WriteLine("Year: " + yearread);
                        Console.WriteLine("Duration: " + durationread);
                        Console.WriteLine("Album's artist: " + artistread);

                        var contributoryArtists = file.Tag.Performers;
                        foreach (var artistName in contributoryArtists)
                        {
                            var artist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == artistName);
                            if (artist == null)
                            {
                                artist = new Artist { Id = Guid.NewGuid(), Name = artistName };
                                await _trillenceContext.Artists.AddAsync(artist);
                            }
                        }

                        await _trillenceContext.SaveChangesAsync();

                        if (file.Tag.Pictures != null && file.Tag.Pictures.Length > 0)
                        {
                            IPicture picture = file.Tag.Pictures[0];
                            byte[] pictureData = picture.Data.Data;

                            string sanitizedAlbumName = SanitizeFileName(albumread);
                            var album = await _trillenceContext.Albums.FirstOrDefaultAsync(a => a.Name == sanitizedAlbumName);
                            if (album == null)
                            {
                                var firstArtist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == file.Tag.FirstAlbumArtist);
                                if (firstArtist == null)
                                {
                                    firstArtist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == "Various Artists");
                                    if (firstArtist == null)
                                    {
                                        firstArtist = new Artist { Id = Guid.NewGuid(), Name = "Various Artists" };
                                        await _trillenceContext.Artists.AddAsync(firstArtist);
                                    }
                                }

                                album = new Album { Id = Guid.NewGuid(), Name = sanitizedAlbumName, Released = yearread, ArtistId = firstArtist.Id };

                                await _trillenceContext.Albums.AddAsync(album);
                                await _trillenceContext.SaveChangesAsync();

                                char[] invalidChars = Path.GetInvalidFileNameChars();
                                string sanitizedFilePath = new string(filePath.Where(c => !invalidChars.Contains(c)).ToArray());
                                string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(filePath);
                                string pictureFilePath = Path.Combine(folderPath, sanitizedAlbumName + ".jpg");
                                System.IO.File.WriteAllBytes(pictureFilePath, pictureData);
                                Console.WriteLine("Album art saved to: " + pictureFilePath);
                            }

                            var song = await _trillenceContext.Songs.FirstOrDefaultAsync(s => s.Name == titleread);
                            if (song == null)
                            {
                                song = new Song { Id = Guid.NewGuid(), Name = titleread, Length = durationread, AlbumId = album.Id, Genre = genreread };
                                await _trillenceContext.Songs.AddAsync(song);
                                await _trillenceContext.SaveChangesAsync();
                            }

                            foreach (var artistName in contributoryArtists)
                            {
                                var artist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == artistName);
                                var artistSongExists = await _trillenceContext.ArtistSongs.AnyAsync(s => s.ArtistId == artist.Id && s.SongId == song.Id);
                                if (!artistSongExists)
                                {
                                    await _trillenceContext.ArtistSongs.AddAsync(new ArtistSong { ArtistId = artist.Id, SongId = song.Id });
                                }
                            }

                            await _trillenceContext.SaveChangesAsync();
                        }
                        else
                        {
                            Console.WriteLine("No album art found in the MP3 file.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error has occurred: " + ex.Message);
            }
        }

        private string SanitizeFileName(string fileName)
        {
            char[] invalidChars = Path.GetInvalidFileNameChars();

            string sanitizedFileName = new string(fileName.Where(c => !invalidChars.Contains(c)).ToArray());

            return sanitizedFileName;
        }
    }
}