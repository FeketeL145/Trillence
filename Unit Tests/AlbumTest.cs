using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace BackEnd.Tests.Repositories.Services
{
    [TestFixture]
    public class AlbumTest
    {
        private Mock<TrillenceContext> _mockContext;
        private IAlbumInterface _albumService;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<TrillenceContext>();
            _albumService = new AlbumService(_mockContext.Object);
        }

        [Test]
        public async Task Post_ValidInput_ReturnsAlbumDto()
        {
            var createAlbumDto = new CreateAlbumDto("Test Album", 2022);
            var album = new Album
            {
                Id = Guid.NewGuid(),
                Name = createAlbumDto.Name,
                Released = createAlbumDto.Released,
            };
            _mockContext.Setup(x => x.Albums.AddAsync(It.IsAny<Album>(), default)).ReturnsAsync((EntityEntry<Album>)null);

            var result = await _albumService.Post(createAlbumDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(createAlbumDto.Name));
            Assert.That(result.Released, Is.EqualTo(createAlbumDto.Released));
        }
    }
}