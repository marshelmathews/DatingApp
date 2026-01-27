using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context,ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
    {
        if (await EmailValidate(dto.Email))
            return BadRequest("Email Taken");
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = dto.displayName,
            Email = dto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user.ToDto(tokenService);
    }

    public async Task<bool> EmailValidate(string emialAddress)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == emialAddress.ToLower());
    }
[HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto login)
    {
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == login.Email);

        if (user == null) return Unauthorized("Invalid Email Address");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

        for (int i =0;i< computedHash.Length;i++ )
        {
            if (computedHash[i] != user.PasswordHash[i])
                return Unauthorized("Invalid Password");
        }

        return user.ToDto(tokenService);
    }
}
