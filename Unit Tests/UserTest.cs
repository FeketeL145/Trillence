using BackEnd.Models;
using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace BackEnd.Tests.Repositories.Services
{
    [TestFixture]
    public class UserTest
    {
        private Mock<TrillenceContext> _mockContext;
        private IUserInterface _userService;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<TrillenceContext>();
            _userService = new UserService(_mockContext.Object);
        }

        [Test]
        public async Task Post_ValidInput_ReturnsUserDto()
        {
            CreateUserDto createUserDto = new CreateUserDto("Test User");
            User user = new User
            {
                Id = Guid.NewGuid(),
                Name = createUserDto.Name,
            };
#pragma warning disable CS8600
#pragma warning disable CS8620
            _mockContext.Setup(x => x.Users.AddAsync(It.IsAny<User>(), default)).ReturnsAsync((EntityEntry<User>)null);
#pragma warning restore CS8620
#pragma warning restore CS8600

            UserDto result = await _userService.Post(createUserDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(createUserDto.Name));
        }
    }
}