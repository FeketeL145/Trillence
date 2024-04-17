using Auth.Data;
using Auth.Models;
using Auth.Models.Dtos;
using Auth.Service.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Auth.Service
{
    public class AuthService : IAuth
    {
        private readonly AppDbcontext appDbcontext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly IJwtTokenGenerator jwtTokenGenerator;

        public AuthService(AppDbcontext appDbcontext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJwtTokenGenerator jwtTokenGenerator)
        {
            this.appDbcontext = appDbcontext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<bool> AssignRole(string email, string roleName)
        {
            var user = appDbcontext.ApplicationUsers.FirstOrDefault(user => user.Email.ToLower() == email.ToLower());

            if (user != null)
            {
                if (!roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                {
                    roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                }

                await userManager.AddToRoleAsync(user, roleName);

                return true;
            }

            return false;
        }

        public async Task<string> Register(RegisterRequestDto registerRequestDto)
        {
            var existingEmail = await userManager.FindByEmailAsync(registerRequestDto.Email);
            if (existingEmail != null)
            {
                return "Email is already registered";
            }

            ApplicationUser user = new()
            {
                UserName = registerRequestDto.UserName,
                NormalizedUserName = registerRequestDto.UserName.ToUpper(),
                Email = registerRequestDto.Email,

            };

            try
            {
                var result = await userManager.CreateAsync(user, registerRequestDto.Password);

                if (result.Succeeded)
                {
                    var userToReturn = appDbcontext.ApplicationUsers.
                        First(user => user.UserName == registerRequestDto.UserName);


                    RegisterResponseDto registerResponseDto = new()
                    {
                        Id = userToReturn.Id,
                        UserName = userToReturn.UserName,
                    };

                    return "";
                }
                else
                {
                    return result.Errors.FirstOrDefault().Description;
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            var user = await appDbcontext.ApplicationUsers.
                FirstOrDefaultAsync(user => user.UserName.ToLower() == loginRequestDto.UserName.ToLower());

            bool isValid = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (user == null || isValid == false)
            {
                return new LoginResponseDto() {Token = "" };
            }

            var roles = await userManager.GetRolesAsync(user);
            var token = jwtTokenGenerator.GenerateToken(user, roles);

            RegisterResponseDto userDto = new()
            {
                Id = user.Id,
                UserName = user.UserName,
            };

            LoginResponseDto loginResponseDto = new()
            {
                Token = token
            };

            return loginResponseDto;
        }
        public async Task<bool> ChangeUsername(string oldUsername, string newUsername)
        {
            var user = await userManager.FindByNameAsync(oldUsername);

            if (user == null)
            {
                return false;
            }

            user.UserName = newUsername;
            user.NormalizedUserName = newUsername.ToUpper();

            var result = await userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> ChangePassword(string username, string oldPassword, string newPassword)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                return false;
            }

            var result = await userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return result.Succeeded;
        }
        public async Task<bool> DeleteUser(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                return false;
            }

            var result = await userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<IsAdminDtoResponse> IsAdmin(string username)
        {
            IsAdminRequestDto isadminrequestDto = new IsAdminRequestDto()
            {
                Username = username,
            };

            var user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                return null;
            }

            bool isAdmin = await userManager.IsInRoleAsync(user, "Admin");

            IsAdminDtoResponse isadminresponseDto = new IsAdminDtoResponse()
            {
                IsAdmin = isAdmin,
            };

            return isadminresponseDto;
        }
    }
}