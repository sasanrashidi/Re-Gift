namespace Re_Gift.Server.Dto;

public class TradeDto
{
    public int User1Id { get; set; }
    public int User2Id { get; set; }
    public int GF1Id { get; set; }
    public int GF2Id { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.Now;
}


