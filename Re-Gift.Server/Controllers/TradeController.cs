using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TradeController : ControllerBase
{
    private readonly ITradeService _tradeService;
    private readonly IUserService _userService;
    private readonly IGiftCardService _giftCardService;

    public TradeController(ITradeService tradeService, IGiftCardService giftCardService, IUserService userService)
    {
        _tradeService = tradeService;
        _giftCardService = giftCardService;
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var trades = await _tradeService.GetTradesAsync();

        return Ok(trades);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var trade = await _tradeService.GetTradeAsync(id);

        return Ok(trade);
    }

    [HttpPost]
    public async Task<IActionResult> Post(int User1Id, int User2Id, int GiftCard1Id, int GiftCard2Id)
    {
        List<User> users = new List<User>();
        List<GiftCard> giftCards = new List<GiftCard>();

        users.Add(await _userService.GetUserAsync(User1Id));
        users.Add(await _userService.GetUserAsync(User2Id));
        giftCards.Add(await _giftCardService.GetGiftCardAsync(GiftCard1Id));
        giftCards.Add(await _giftCardService.GetGiftCardAsync(GiftCard2Id));
        
        await _tradeService.TradeDoneAsync(users, giftCards);

        return Ok();
    }

    [HttpPut("{id}")] // FIXA FELHANTERING UTANFÖR SCOPE
    public async Task<IActionResult> Put(Trade trade)
    {
        var updatedTrade = await _tradeService.UpdateTradeAsync(trade);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedTrade = await _tradeService.GetTradeAsync(id);
        await _tradeService.DeleteTradeAsync(deletedTrade);

        return Ok();
    }
}
