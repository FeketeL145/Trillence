using Microsoft.EntityFrameworkCore;
using TagLib;

namespace BackEnd
{
    public class AudioMetadataReader
    {
        private readonly TrillenceContext _trillenceContext;

        public AudioMetadataReader(TrillenceContext trillenceContext)
        {
            _trillenceContext = trillenceContext;
        }

        public async Task ReadMetadata()
        {
            try
            {
                IConfigurationRoot config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                string folderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
                folderPath = folderPath.Trim('"');
                IEnumerable<string> files = Directory.EnumerateFiles(folderPath)
                .Where(file => file.ToLower().EndsWith(".mp3") ||
                   file.ToLower().EndsWith(".flac") ||
                   file.ToLower().EndsWith(".m4a"));


                foreach (string? filePath in files)
                {
                    using (TagLib.File file = TagLib.File.Create(filePath))
                    {
                        string titleread = file.Name;
                        int lastBackslashIndex = filePath.LastIndexOf('\\');
                        int lastDotIndex = filePath.LastIndexOf('.');
                        string actualtitle = filePath.Substring(lastBackslashIndex + 1, lastDotIndex - lastBackslashIndex - 1);
                        string albumread = file.Tag.Album;
                        string genreread = file.Tag.FirstGenre ?? "Unknown";
                        uint yearread = file.Tag.Year;
                        TimeSpan durationread = file.Properties.Duration;
                        string artistread = file.Tag.FirstAlbumArtist;

                        Console.WriteLine("Title: " + actualtitle);
                        Console.WriteLine("Album: " + albumread);
                        Console.WriteLine("Genre: " + genreread);
                        Console.WriteLine("Year: " + yearread);
                        Console.WriteLine("Duration: " + durationread);
                        Console.WriteLine("Album's artist: " + artistread);

                        string[] contributoryArtists = file.Tag.Performers;
                        foreach (string? artistName in contributoryArtists)
                        {
                            Artist? artist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == artistName);
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
                            Album? album = await _trillenceContext.Albums.FirstOrDefaultAsync(a => a.Name == sanitizedAlbumName);
                            if (album == null)
                            {
                                Artist? firstArtist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == file.Tag.FirstAlbumArtist);
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

                            Song? song = await _trillenceContext.Songs.FirstOrDefaultAsync(s => s.Name == actualtitle);
                            if (song == null)
                            {
                                song = new Song { Id = Guid.NewGuid(), Name = actualtitle, Length = durationread, AlbumId = album.Id, Genre = genreread };
                                await _trillenceContext.Songs.AddAsync(song);
                                await _trillenceContext.SaveChangesAsync();
                            }

                            foreach (string? artistName in contributoryArtists)
                            {
                                Artist? artist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == artistName);
                                if (artist == null)
                                {
                                    artist = new Artist { Id = Guid.NewGuid(), Name = artistName };
                                    await _trillenceContext.Artists.AddAsync(artist);
                                }
                            }

                            await _trillenceContext.SaveChangesAsync();

                            if (file.Tag.Pictures != null && file.Tag.Pictures.Length > 0)
                            {
                                picture = file.Tag.Pictures[0];
                                pictureData = picture.Data.Data;

                                sanitizedAlbumName = SanitizeFileName(albumread);
                                album = await _trillenceContext.Albums.FirstOrDefaultAsync(a => a.Name == sanitizedAlbumName);
                                if (album == null)
                                {
                                    Artist? firstArtist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == file.Tag.FirstAlbumArtist);
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

                                song = await _trillenceContext.Songs.FirstOrDefaultAsync(s => s.Name == actualtitle);
                                if (song == null)
                                {
                                    song = new Song { Id = Guid.NewGuid(), Name = actualtitle, Length = durationread, AlbumId = album.Id, Genre = genreread };
                                    await _trillenceContext.Songs.AddAsync(song);
                                    await _trillenceContext.SaveChangesAsync();
                                }

                                foreach (string? artistName in contributoryArtists.Where(a => a != artistread))
                                {
                                    Artist? artist = await _trillenceContext.Artists.FirstOrDefaultAsync(a => a.Name == artistName);
                                    bool artistSongExists = await _trillenceContext.ArtistSongs.AnyAsync(s => s.ArtistId == artist.Id && s.SongId == song.Id);
                                    if (!artistSongExists)
                                    {
                                        await _trillenceContext.ArtistSongs.AddAsync(new ArtistSong { ArtistId = artist.Id, SongId = song.Id });
                                    }
                                }

                                await _trillenceContext.SaveChangesAsync();
                            }
                            else
                            {
                                Console.WriteLine("No album art found in the audio file.");
                            }
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