using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore;

[TestFixture]
public class PlaylistTest
{
    private TrillenceContext _context;
    private IPlaylistInterface _playlistService;

    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<TrillenceContext>()
            .UseInMemoryDatabase("TrillenceTestDb")
            .Options;

        _context = new TrillenceContext(options);
        _playlistService = new PlaylistService(_context);

        _context.Users.Add(new User { Id = Guid.NewGuid(), Name = "Test Username" });
        _context.SaveChanges();
    }

    [TearDown]
    public void TearDown()
    {
        if (_context != null)
        {
            _context.Dispose();
        }
    }

    [Test]
    public async Task Post_ValidInput_ReturnsPlaylist()
    {
        var createPlaylistDto = new CreatePlaylistDto("Test Playlist", "Test Username");

        var result = await _playlistService.Post(createPlaylistDto);

        var expectedUser = _context.Users.FirstOrDefault(u => u.Name == "Test Username");

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Name, Is.EqualTo(createPlaylistDto.Name));
#pragma warning disable CS8602
        Assert.That(result.UserId, Is.EqualTo(expectedUser.Id));
#pragma warning restore CS8602
    }
}