namespace Re_Gift.Server.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public List<GiftCard>? GiftCards { get; set; }
}