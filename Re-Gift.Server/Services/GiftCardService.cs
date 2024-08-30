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
    public async Task<bool> DeleteGiftCardAsync(Giftcard giftcard)
    {
        _context.Remove(giftcard);
        return await SaveAsync();
    }

    public async Task<Giftcard> GetGiftCardAsync(int id)
    {
        return await _context.Giftcards.FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<ICollection<Giftcard>> GetGiftCardsAsync()
    {
        return await _context.Giftcards.ToListAsync();
    }

    public async Task<bool> UpdateGiftcardAsync(Giftcard giftcard)
    {
        _context.Update(giftcard);
        return await SaveAsync();
    }

    public async Task<ICollection<Giftcard>> GetGiftCardsFromUserIdAsync(int userId)
    {
        return await _context.Users
                             .Where(u => u.Id == userId)
                             .SelectMany(u => u.Giftcards)
                             .ToListAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
