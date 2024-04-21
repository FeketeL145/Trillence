using Auth.Models;
using Auth.Service.IService;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Auth.Service
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtOptions jwtOptions;

        public JwtTokenGenerator(IOptions<JwtOptions> jwtOptions)
        {
            this.jwtOptions = jwtOptions.Value;
        }

        public string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> roles)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            byte[] key = Encoding.ASCII.GetBytes(jwtOptions.Secret);

            List<Claim> claimList = new List<Claim>
            {

                new Claim(JwtRegisteredClaimNames.Sub,applicationUser.Id),
                new Claim(JwtRegisteredClaimNames.Name,applicationUser.UserName.ToString()),
                new Claim(JwtRegisteredClaimNames.Email,applicationUser.Email.ToString()),
            };

            claimList.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            SecurityTokenDescriptor tokenDescription = new SecurityTokenDescriptor
            {
                Audience = jwtOptions.Audience,
                Issuer = jwtOptions.Issuer,
                Subject = new ClaimsIdentity(claimList),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}