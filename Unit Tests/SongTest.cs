using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace BackEnd.Tests.Repositories.Services
{
    [TestFixture]
    public class SongTest
    {
        private Mock<TrillenceContext> _mockContext;
        private ISongInterface _songService;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<TrillenceContext>();
            _songService = new SongService(_mockContext.Object);
        }

        [Test]
        public async Task Post_ValidInput_ReturnsSongDto()
        {
            var createSongDto = new CreateSongDto("Test Song", TimeSpan.FromSeconds(180), Guid.NewGuid(), "Rock");
            var song = new Song
            {
                Id = Guid.NewGuid(),
                Name = createSongDto.Name,
                Length = createSongDto.Length,
                AlbumId = createSongDto.AlbumId,
                Genre = createSongDto.Genres,
            };
            _mockContext.Setup(x => x.Songs.AddAsync(It.IsAny<Song>(), default)).ReturnsAsync((EntityEntry<Song>)null);

            var result = await _songService.Post(createSongDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(createSongDto.Name));
            Assert.That(result.Length, Is.EqualTo(createSongDto.Length));
            Assert.That(result.Genres, Is.EqualTo(createSongDto.Genres));
        }
    }
}
