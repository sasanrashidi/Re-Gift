using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.Dto;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;


namespace Re_Gift.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GiftcardController : ControllerBase
{
    private readonly IGiftCardService _giftcardService;
    private readonly IMapper _mapper;

    public GiftcardController(IGiftCardService giftcardService, IMapper mapper)
    {
        _giftcardService = giftcardService;
        _mapper = mapper;  
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var giftcards = await _giftcardService.GetGiftCardsAsync();

        var mappEntity = _mapper.Map<List<GiftCardDto>>(giftcards);


        return Ok(mappEntity);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var giftcard = await _giftcardService.GetGiftCardAsync(id);

        var mappEntity = _mapper.Map<GiftCardDto>(giftcard);

        return Ok(mappEntity);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GiftCardDto giftcard)
    {
        var mappEntity = _mapper.Map<GiftCard>(giftcard);

        var createdGiftcard = await _giftcardService.AddGiftCardAsync(mappEntity);

        return Ok(giftcard);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(GiftCardDto giftcard,int id)
    {

        var mappEntity = _mapper.Map<GiftCard>(giftcard);

        var updatedGiftcard = await _giftcardService.UpdateGiftcardAsync(mappEntity);

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