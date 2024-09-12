using System.ComponentModel.DataAnnotations.Schema;

namespace Re_Gift.Server.Models;

public class GiftCard
{
    public int Id { get; set; }
    public string Company { get; set; }
    public DateTime ExpireDate { get; set; }
    public decimal Balance { get; set; }
    public decimal DiscountedBalance
    {
        get
        {
            return Balance * DiscountPercentage;
        }
        set
        {
            Balance = value / (1 - DiscountPercentage);
        }
    }

    public DateTime RegistrationDate { get; set; } = DateTime.Now;
    public string SerialNumber { get; set; }
    public decimal DiscountPercentage { get; set; }
    public bool Verified { get; set; }
    public bool Sold { get; set; }
    public int? UserId { get; set; }
    public User? User { get; set; }
}