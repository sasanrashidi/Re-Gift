using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.Dto;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;
using Re_Gift.Server.Services;

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

        if (giftcards == null)
        {
            return NotFound();
        }

        var mappEntity = _mapper.Map<List<GiftCardDto>>(giftcards);


        return Ok(mappEntity);
    }

    [HttpGet("SoldCard{id}")]
    public async Task<IActionResult> GetIfSoldGiftCard(int id)
    {
        var sold = await _giftcardService.CheckIfSold(id);

        if (sold == true)
        {
            return Ok(sold);
        }
        return Ok(sold);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var giftcard = await _giftcardService.GetGiftCardAsync(id);

        if (giftcard == null)
        {
            return NotFound();
        }

        var mappEntity = _mapper.Map<GiftCardDto>(giftcard);

        return Ok(mappEntity);
    }

    [HttpGet("{company}/getCompany")]
    public async Task<IActionResult> GetCompany(string company)
    {
        var giftcard = await _giftcardService.GetGiftCardCompanyAsync(company);

        if (giftcard.Count == 0)
        {
            return NotFound();
        }

        var mappEntity = _mapper.Map<List<GiftCardDto>>(giftcard);

        return Ok(mappEntity);
    }

    //[HttpPost]
    //public async Task<IActionResult> Post([FromBody] GiftCardDto giftcard)
    //{
    //    var mappEntity = _mapper.Map<GiftCard>(giftcard);

    //    var createdGiftcard = await _giftcardService.AddGiftCardAsync(mappEntity);

    //    return Ok(giftcard);
    //}

    [HttpPost("{userId}/{companyEnum}/{discountedEnum}")]
    public async Task<IActionResult> AddGiftCardAsync([FromBody] GiftCardDto giftcard, int userId, int companyEnum, int discountedEnum)
    {
        try
        {
            var addedGiftCard = _mapper.Map<GiftCard>(giftcard);

            var result = await _giftcardService.AddGiftCardAsync(addedGiftCard, userId, companyEnum, discountedEnum);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Failed to add gift card");
            }
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
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

        if (deletedGiftcard == null)
        {
            return NotFound();
        }

        await _giftcardService.DeleteGiftCardAsync(deletedGiftcard);

        return Ok();
    }


    
}