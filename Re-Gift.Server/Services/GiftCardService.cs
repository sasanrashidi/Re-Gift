using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Services;

public class GiftCardService : IGiftCardService
{
    private readonly DataContext _context;

    public GiftCardService(DataContext Context)
    {
        _context = Context;
    }
    public async Task<ICollection<GiftCard>> GetGiftCardsAsync()
    {
        return await _context.Giftcards.ToListAsync();
    }

    public async Task<GiftCard> GetGiftCardAsync(int id)
    {
        return await _context.Giftcards.FirstOrDefaultAsync(g => g.Id == id);
    }
    public async Task<ICollection<GiftCard>> GetGiftCardsFromUserIdAsync(int userId)
    {
        return await _context.Users
                             .Where(u => u.Id == userId)
                             .SelectMany(u => u.GiftCards)
                             .ToListAsync();
    }
    public async Task<bool> AddGiftCardAsync(GiftCard giftcard)
    {
        _context.Add(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> UpdateGiftcardAsync(GiftCard giftcard)
    {
        _context.Update(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> DeleteGiftCardAsync(GiftCard giftcard)
    {
        _context.Remove(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}