namespace Re_Gift.Server.Models;

public class GiftCard
{
    public int Id { get; set; }
    public string Company { get; set; }
    public DateTime ExpireDate { get; set; } = DateTime.Now.AddDays(7); // NEW !!!
    public decimal Balance { get; set; }
    public DateTime RegistrationDate { get; set; } = DateTime.Now;
    public Guid SerialNumber { get; set; } = Guid.NewGuid();
    public bool Verified { get; set; }
    public bool Sold { get; set; }
    public int? userId { get; set; }
    public User? User { get; set; }
}