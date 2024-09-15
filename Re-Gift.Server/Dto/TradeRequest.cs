namespace Re_Gift.Server.Dto
{
    public class TradeRequest
    {
        public List<int> SellerId { get; set; }
        public int BuyerId { get; set; }
        public List<int> GiftcardId { get; set; }


    }
}
