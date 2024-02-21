using BackEnd.Models.Dtos;

namespace BackEnd.Repositories.Interfaces
{
    public interface IUserInterface
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(Guid id);
        Task<UserDto> Post(CreateUserDto createUserDto);
        Task<UserDto> Put(Guid id, ModifyUserDto modifyUserDto);
        Task<User> DeleteById(Guid id);
    }
}