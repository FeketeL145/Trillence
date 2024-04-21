using BackEnd.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Services
{
    public class UserService : IUserInterface
    {
        private readonly TrillenceContext trillenceContext;

        public UserService(TrillenceContext trillenceContext)
        {
            this.trillenceContext = trillenceContext;
        }

        public async Task<UserDto> Post(CreateUserDto createUserDto)
        {
            User user = new User
            {
                Id = Guid.NewGuid(),
                Name = createUserDto.Name,
            };

            await trillenceContext.Users.AddAsync(user);
            await trillenceContext.SaveChangesAsync();
            return user.AsDto();
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await trillenceContext.Users.ToListAsync();
        }

        public async Task<User> GetById(Guid id)
        {
            return await trillenceContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<UserDto> Put(Guid id, ModifyUserDto modifyUserDto)
        {
            User? existingUser = await trillenceContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUser != null)
            {
                existingUser.Name = modifyUserDto.Name;

                trillenceContext.Update(existingUser);
                await trillenceContext.SaveChangesAsync();

                return existingUser.AsDto();
            }

            return null;
        }

        public async Task<User> DeleteById(Guid id)
        {
            User? user = await trillenceContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user != null)
            {
                trillenceContext.Users.Remove(user);
                await trillenceContext.SaveChangesAsync();
            }

            return user;
        }
    }
}