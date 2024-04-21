using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace BackEnd.Tests.Repositories.Services
{
    [TestFixture]
    public class PlaylistTest
    {
        private Mock<TrillenceContext> _mockContext;
        private IPlaylistInterface _playlistService;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<TrillenceContext>();
            _playlistService = new PlaylistService(_mockContext.Object);
        }

        [Test]
        public async Task Post_ValidInput_ReturnsPlaylist()
        {
            CreatePlaylistDto createPlaylistDto = new CreatePlaylistDto("Test Playlist", Guid.NewGuid());
            Playlist playlist = new Playlist
            {
                Id = Guid.NewGuid(),
                Name = createPlaylistDto.Name,
                UserId = createPlaylistDto.UserId,
            };
            _mockContext.Setup(x => x.Playlists.AddAsync(It.IsAny<Playlist>(), default)).ReturnsAsync((EntityEntry<Playlist>)null);

            Playlist result = await _playlistService.Post(createPlaylistDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(createPlaylistDto.Name));
            Assert.That(result.UserId, Is.EqualTo(createPlaylistDto.UserId));
        }
    }
}