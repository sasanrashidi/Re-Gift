using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService
{
    public interface IGiftCardService
    {

        public Giftcard GetGiftCards();

        public Giftcard GetGiftCard(int id);

        public void DeleteGiftCards(int id);

        public Giftcard UpdateGiftcards(int id);

    }
}
