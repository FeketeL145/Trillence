using Auth.Data;
using Auth.Models;
using Auth.Models.Dtos;
using Auth.Service.IService;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace Auth.Service
{
    public class AuthService : IAuth
    {
        private readonly AppDbcontext appDbcontext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly IJwtTokenGenerator jwtTokenGenerator;

        private static bool isProcessingResetTokenEmail = false;

        public AuthService(AppDbcontext appDbcontext,
                           UserManager<ApplicationUser> userManager,
                           RoleManager<IdentityRole> roleManager,
                           IConfiguration configuration,
                           IJwtTokenGenerator jwtTokenGenerator)
        {
            this.appDbcontext = appDbcontext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        public AuthService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<bool> AssignRole(string email, string roleName)
        {
            ApplicationUser? user = appDbcontext.ApplicationUsers.FirstOrDefault(user => user.Email.ToLower() == email.ToLower());

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
            ApplicationUser? existingEmail = await userManager.FindByEmailAsync(registerRequestDto.Email);
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
                IdentityResult result = await userManager.CreateAsync(user, registerRequestDto.Password);

                if (result.Succeeded)
                {
                    ApplicationUser userToReturn = appDbcontext.ApplicationUsers.
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
            ApplicationUser? user = await appDbcontext.ApplicationUsers.
                FirstOrDefaultAsync(user => user.UserName.ToLower() == loginRequestDto.UserName.ToLower());

            bool isValid = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (user == null || isValid == false)
            {
                return new LoginResponseDto() {Token = "" };
            }

            IList<string> roles = await userManager.GetRolesAsync(user);
            string token = jwtTokenGenerator.GenerateToken(user, roles);

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
            ApplicationUser? user = await userManager.FindByNameAsync(oldUsername);

            if (user == null)
            {
                return false;
            }

            user.UserName = newUsername;
            user.NormalizedUserName = newUsername.ToUpper();

            IdentityResult result = await userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> ChangePassword(string username, string oldPassword, string newPassword)
        {
            ApplicationUser? user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                return false;
            }

            IdentityResult result = await userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return result.Succeeded;
        }

        public async Task<bool> SendResetTokenEmail(string emailAddress)
        {
            if (isProcessingResetTokenEmail)
            {
                throw new InvalidOperationException("Recursive call detected. Exiting.");
            }

            isProcessingResetTokenEmail = true;

            try
            {
                var email = new MimeMessage();
                var emailUser = configuration.GetSection("EmailSettings:EmailUserName").Value;

                if (string.IsNullOrEmpty(emailUser))
                {
                    throw new ArgumentNullException("Email user is not configured.");
                }

                ApplicationUser? user = await userManager.FindByEmailAsync(emailAddress);
                if (user == null)
                {
                    throw new InvalidOperationException($"User with email '{emailAddress}' not found.");
                }

                email.From.Add(MailboxAddress.Parse(emailUser));
                email.To.Add(MailboxAddress.Parse(emailAddress));
                email.Subject = "Trillence - Reset Password";

                var bodyBuilder = new BodyBuilder();

                if (!File.Exists("EmailTemplate.html"))
                {
                    throw new FileNotFoundException("Email template not found.");
                }

                using (StreamReader sourceReader = File.OpenText("EmailTemplate.html"))
                {
                    bodyBuilder.HtmlBody = sourceReader.ReadToEnd();
                }

                string resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
                bodyBuilder.HtmlBody = bodyBuilder.HtmlBody.Replace("{resetToken}", resetToken);

                email.Body = bodyBuilder.ToMessageBody();

                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Connect(configuration.GetSection("EmailSettings:EmailHost").Value, 587, SecureSocketOptions.StartTls);
                    smtp.Authenticate(emailUser, configuration.GetSection("EmailSettings:EmailPassword").Value);
                    smtp.Send(email);
                    smtp.Disconnect(true);
                }

                return true;
            }
            finally
            {
                isProcessingResetTokenEmail = false;
            }
        }

        public async Task<bool> ForgotPassword(string emailAddress, string newPassword, string resetToken)
        {
            ApplicationUser? user = await userManager.FindByEmailAsync(emailAddress);

            if (user == null)
            {
                return false;
            }

            IdentityResult result = await userManager.ResetPasswordAsync(user, resetToken, newPassword);

            return result.Succeeded;
        }

        public async Task<bool> DeleteUser(string username)
        {
            ApplicationUser? user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                return false;
            }

            IdentityResult result = await userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<IsAdminDtoResponse> IsAdmin(string username)
        {
            IsAdminRequestDto isadminrequestDto = new IsAdminRequestDto()
            {
                Username = username,
            };

            ApplicationUser? user = await userManager.FindByNameAsync(username);

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