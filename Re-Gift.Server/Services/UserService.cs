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

    public async Task<User> UserLoginAsync(string email, string password)
    {
        
        var foundUser = await _context.Users.FirstOrDefaultAsync(g => g.Email == email);

        
        if (foundUser == null)
        {
            throw new ArgumentException("User with the provided email does not exist.");
        }

        
        if (foundUser.Password != password) 
        {
            throw new ArgumentException("Invalid password.");
        }

        return foundUser;
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
