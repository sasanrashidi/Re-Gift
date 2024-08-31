using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface IGiftCardService
{
    public Task<ICollection<GiftCard>> GetGiftCardsAsync();

    public Task<ICollection<GiftCard>> GetGiftCardsFromUserIdAsync(int id);

    public Task<GiftCard> GetGiftCardAsync(int id);

    public Task<bool> AddGiftCardAsync(GiftCard giftcard);

    public Task<bool> UpdateGiftcardAsync(GiftCard giftcard);

    public Task<bool> DeleteGiftCardAsync(GiftCard giftcard);

    public Task<bool> SaveAsync();
}