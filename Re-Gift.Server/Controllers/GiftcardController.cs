using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GiftcardController : ControllerBase
{
    private readonly IGiftCardService _giftcardService;

    public GiftcardController(IGiftCardService giftcardService)
    {
        _giftcardService = giftcardService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var giftcards = await _giftcardService.GetGiftCardsAsync();

        return Ok(giftcards);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var giftcard = await _giftcardService.GetGiftCardAsync(id);

        return Ok(giftcard);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GiftCard giftcard)
    {
        var createdGiftcard = await _giftcardService.AddGiftCardAsync(giftcard);

        return Ok(giftcard);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(GiftCard giftcard)
    {
        var updatedGiftcard = await _giftcardService.UpdateGiftcardAsync(giftcard);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedGiftcard = await _giftcardService.GetGiftCardAsync(id);
        await _giftcardService.DeleteGiftCardAsync(deletedGiftcard);

        return Ok();
    }
}