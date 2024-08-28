namespace Re_Gift.Server.Models;

public class Trade
{
    public int Id { get; set; }
    public List<User> Users { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.Now;
    public List<Giftcard> Giftcards { get; set; }
}