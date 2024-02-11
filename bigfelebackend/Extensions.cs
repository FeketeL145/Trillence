using BackEnd.Models.Dtos;

namespace BackEnd
{
    public static class Extensions
    {
        public static SongDto AsDto(this Song song)
        {
            return new SongDto(song.Id, song.Name, song.FileName , song.AlbumPhoto, song.Length, song.Listens, song.Likes, song.Disikes, song.Artist, song.Album, song.Genre);
        }

    }
}