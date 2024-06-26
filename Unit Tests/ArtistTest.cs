﻿using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace BackEnd.Tests.Repositories.Services
{
    [TestFixture]
    public class ArtistTest
    {
        private Mock<TrillenceContext> _mockContext;
        private IArtistInterface _artistService;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<TrillenceContext>();
            _artistService = new ArtistService(_mockContext.Object);
        }

        [Test]
        public async Task Post_ValidInput_ReturnsArtistDto()
        {
            CreateArtistDto createArtistDto = new CreateArtistDto("Test Artist");
            Artist artist = new Artist
            {
                Id = Guid.NewGuid(),
                Name = createArtistDto.Name,
            };
#pragma warning disable CS8600
#pragma warning disable CS8620
            _mockContext.Setup(x => x.Artists.AddAsync(It.IsAny<Artist>(), default)).ReturnsAsync((EntityEntry<Artist>)null);
#pragma warning restore CS8620
#pragma warning restore CS8600

            ArtistDto result = await _artistService.Post(createArtistDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(createArtistDto.Name));
        }
    }
}