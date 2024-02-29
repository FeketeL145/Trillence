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
            try
            {
                using (var file = TagLib.File.Create(filePath))
                {
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

                    var artist = new Artist
                    {
                        Id = Guid.NewGuid(),
                        Name = artistread,
                    };

                    var album = new Album
                    {
                        Id = Guid.NewGuid(),
                        Name = albumread,
                        Image = "Image.jpg",
                        Released = yearread,
                    };

                    var song = new Song
                    {
                        Id = Guid.NewGuid(),
                        Name = titleread,
                        Length = durationread,
                        AlbumId = album.Id,
                        Genre = genreread,
                    };

                    await trillenceContext.Artists.AddAsync(artist);
                    await trillenceContext.SaveChangesAsync();
                    await trillenceContext.Albums.AddAsync(album);
                    await trillenceContext.SaveChangesAsync();
                    await trillenceContext.Songs.AddAsync(song);
                    await trillenceContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error has occurred: " + ex.Message);
            }
        }
    }
}