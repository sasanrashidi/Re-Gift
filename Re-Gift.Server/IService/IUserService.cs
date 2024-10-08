﻿using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface IUserService
{
    public Task<ICollection<User>> GetUsersAsync();

    public Task<User> GetUserAsync(int id);

    public Task<bool> AddUserAsync(User user);

    public Task<User> UserLoginAsync(string email, string password);

    public Task<bool> UpdateUserAsync(User user);

    public Task<bool> DeleteUserAsync(User user);

    public Task<bool> SellerOwnerOfGiftCardAsync(int sellerId, int giftCardId);

    public Task<ICollection<User>> GetUsersAsyncWithGiftCards();

    public Task<bool> SaveAsync();
}