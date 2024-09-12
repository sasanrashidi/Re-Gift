namespace Re_Gift.Server.Models;

public class GiftCard
{
    public int Id { get; set; }
    public string Company { get; set; }
    public DateTime ExpireDate { get; set; }
    public float Balance { get; set; }

    public float DiscountedBalance
    {
        get
        {
            return Balance * DiscountPercentage;
        }
    }

    public DateTime RegistrationDate { get; set; } = DateTime.Now;
    public string SerialNumber { get; set; }
    public float DiscountPercentage { get; set; }
    public bool Verified { get; set; }
    public bool Sold { get; set; }
    public int? UserId { get; set; }
    public User? User { get; set; }
}