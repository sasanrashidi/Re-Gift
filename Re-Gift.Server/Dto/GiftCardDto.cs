namespace Re_Gift.Server.Dto;

public class GiftCardDto
{
    public int Id { get; set; }
    public string Company { get; set; }
    public DateTime ExpireDate { get; set; }
    public decimal Balance { get; set; }
    public decimal DiscountedBalance => Balance * DiscountPercentage;
    public int? UserId { get; set; }

    public decimal DiscountPercentage { get; set; }
    public string SerialNumber { get; set; }
}
