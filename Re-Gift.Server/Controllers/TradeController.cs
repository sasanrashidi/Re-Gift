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

    public TradeController(ITradeService tradeService)
    {
        _tradeService = tradeService;
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
    public async Task<IActionResult> Post([FromQuery] List<User> users, [FromQuery] List<GiftCard> giftCards)
    {
        var createdTrade = await _tradeService.TradeDoneAsync(users, giftCards);

        var response = new
        {
            Users = users,
            GiftCards = giftCards
        };

        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Trade trade)
    {
        var updatedTrade = await _tradeService.UpdateTradeAsync(trade);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Trade trade)
    {
        var deletedTrade = await _tradeService.DeleteTradeAsync(trade);

        return Ok();
    }
}
