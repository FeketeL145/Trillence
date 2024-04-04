using BackEnd.Models.Dtos;
using BackEnd.Repositories.Interfaces;
using BackEnd.Repositories.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;
using NUnit.Framework;

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
            var createUserDto = new CreateUserDto("Test User");
            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = createUserDto.Name,
            };
            _mockContext.Setup(x => x.Users.AddAsync(It.IsAny<User>(), default)).ReturnsAsync((EntityEntry<User>)null);

            var result = await _userService.Post(createUserDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(createUserDto.Name));
        }
    }
}