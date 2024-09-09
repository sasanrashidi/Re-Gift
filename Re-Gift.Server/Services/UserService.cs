﻿using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Services;

public class UserService : IUserService
{
    private readonly DataContext _context;

    public UserService(DataContext Context)
    {
        _context = Context;
    }

    public async Task<ICollection<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<ICollection<User>> GetUsersAsyncWithGiftCards()
    {
        return await _context.Users.Include(g => g.GiftCards).ToListAsync();
    }

    public async Task<bool> SellerOwnerOfGiftCardAsync(int sellerId, int giftCardId)
    {
        var giftCard = await _context.Giftcards
            .Where(gc => gc.Id == giftCardId && gc.User.Id == sellerId)
            .SingleOrDefaultAsync();

        return giftCard != null;
    }

    public async Task<User> GetUserAsync(int id)
    {
        return await _context.Users.Where(g => g.Id == id).FirstOrDefaultAsync();
    }

    public async Task<bool> AddUserAsync(User user)
    {
        _context.Add(user);
        return await SaveAsync();
    }

    public async Task<bool> UserLoginAsync(string email, string password)
    {
        // Find user by email first
        var foundUser = await _context.Users.FirstOrDefaultAsync(g => g.Email == email);

        // Check if user was found
        if (foundUser == null)
        {
            throw new ArgumentException("User with the provided email does not exist.");
        }

        // Validate the password (in practice, you should use hashed password comparison)
        if (foundUser.Password != password) // Replace this with your password hash comparison
        {
            throw new ArgumentException("Invalid password.");
        }

        return true;
    }

    public async Task<bool> UpdateUserAsync(User user)
    {
        _context.Update(user);
        return await SaveAsync();
    }

    public async Task<bool> DeleteUserAsync(User user)
    {
        _context.Remove(user);
        return await SaveAsync();
    }

    public async Task<bool> SaveAsync()
    {
        var save = await _context.SaveChangesAsync();
        return save > 0 ? true : false;
    }
}
