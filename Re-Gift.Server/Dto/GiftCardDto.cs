using Re_Gift.Server.Models;

namespace Re_Gift.Server.Dto;

public class GiftCardDto
{
    public string Company { get; set; }
    public DateTime ExpireDate { get; set; }
    public decimal Balance { get; set; }
}

public enum CompanyChoices
{
    Nike = 1,
    Adidas = 2,
    GameStop = 3
}
