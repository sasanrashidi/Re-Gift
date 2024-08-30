using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface IGiftCardService
{

    public ICollection<Giftcard> GetGiftCards();

    public Giftcard GetGiftCard(int id);

    public bool DeleteGiftCard(Giftcard giftcard);

    public ICollection<Giftcard> GetGiftCardsFromUserId(int id);

    public bool UpdateGiftcard(Giftcard giftcard);
    public bool Save();
}
