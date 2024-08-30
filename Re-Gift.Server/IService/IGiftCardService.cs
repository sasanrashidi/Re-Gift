using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface IGiftCardService
{

    public Task<ICollection<Giftcard>> GetGiftCardsAsync();

    public Task<Giftcard> GetGiftCardAsync(int id);

    public Task<bool> DeleteGiftCardAsync(Giftcard giftcard);

    public Task<ICollection<Giftcard>> GetGiftCardsFromUserIdAsync(int id);

    public Task<bool> UpdateGiftcardAsync(Giftcard giftcard);

    public Task<bool> SaveAsync();
}
