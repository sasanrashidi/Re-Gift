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
    public bool DeleteGiftCard(Giftcard giftcard)
    {
        _context.Remove(giftcard);
        return Save();
    }

    public Giftcard GetGiftCard(int id)
    {
        return  _context.Giftcards.Where(g => g.Id==id).FirstOrDefault();   
    }

    public ICollection<Giftcard> GetGiftCards()
    {
        return _context.Giftcards.ToList();
    }

    public bool Save()
    {
        var save = _context.SaveChanges();
        return save > 0 ? true : false;
    }

    public bool UpdateGiftcard(Giftcard giftcard)
    {
        _context.Update(giftcard);
        return Save();
    }
}
