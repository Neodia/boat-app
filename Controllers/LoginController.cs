using boat_app.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
// using FromBodyAttribute = Microsoft.AspNetCore.Mvc.FromBodyAttribute;
// using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;

namespace boat_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration _config;
        private static int userId = 0;
        private static List<User> us = new List<User>(new User[]
        {
            new User(userId++, "Ricardo", "123Soleil"),
            new User(userId++, "Jean", "123Lune"),
            new User(userId++, "Jeanne", "123Univers")
        });

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        // [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User AuthenticateUser(User login)
        {
            User u = us.FirstOrDefault(u => u.EqualsForLogin(login));
            return u;
        }
    }
}

