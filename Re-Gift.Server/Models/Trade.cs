namespace Re_Gift.Server.Models;

public class Trade
{
    public int Id { get; set; }
    public int BuyerId { get; set; }
    public int SellerId { get; set; }
    public int SoldCardId { get; set; }
    public Guid PurchaseId { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.Now;
}