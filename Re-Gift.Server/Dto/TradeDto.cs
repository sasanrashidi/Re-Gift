namespace Re_Gift.Server.Dto;

public class TradeDto
{
    public int Id { get; set; }
    public int User1Id { get; set; }
    public int User2Id { get; set; }
    public int SoldGFId { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.Now;
}