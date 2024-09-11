using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeController : ControllerBase
    {
        private readonly ITradeService _tradeService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IGiftCardService _giftcardService;

        public TradeController(ITradeService tradeService, IMapper mapper, IUserService userService, IGiftCardService giftcardService)
        {
            _tradeService = tradeService;
            _mapper = mapper;
            _userService = userService;
            _giftcardService = giftcardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTradesAsync()
        {
            return Ok(await _tradeService.GetTradesAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTradeAsync(int id)
        {
            return Ok(await _tradeService.GetTradeAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> PostTradeAsync(int sellerId, int buyerId, int giftcardId)
        {
            var trade = new Trade();

            if (await _userService.GetUserAsync(buyerId) == null)
            {
                return NotFound("Buyer not found");
            }

            var seller = await _userService.GetUserAsync(sellerId);
            var ownsGiftcard = await _userService.SellerOwnerOfGiftCardAsync(sellerId, giftcardId);
            if (seller == null || !ownsGiftcard)
            {
                return NotFound("Seller not found / doesn't own giftcard");
            }

            var giftcard = await _giftcardService.GetGiftCardAsync(giftcardId);
            if (giftcard == null || giftcard.Sold)
            {
                return NotFound("Giftcard not found / already sold");
            }

            trade.User1Id = sellerId;
            trade.User2Id = buyerId;
            trade.SoldGFId = giftcardId;

            var soldGiftcard = await _giftcardService.GetGiftCardAsync(giftcardId);
            soldGiftcard.Sold = true;
            await _giftcardService.UpdateGiftcardAsync(soldGiftcard);

            await _tradeService.TradeDoneAsyncReal(trade);
            return Ok(trade);
        }
    }
}