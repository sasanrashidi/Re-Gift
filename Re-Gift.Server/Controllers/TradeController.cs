using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.Dto;
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
        public async Task<IActionResult> PostTradeAsync(TradeRequest tradeRequest)
        {
            var trades = new List<Trade>();

            var purchaseId = new Guid();

            if (tradeRequest.SellerId.Count != tradeRequest.GiftcardId.Count)
                return NotFound("Something went wrong");

            for (int index = 0; index < tradeRequest.SellerId.Count; index++)
            {
                var trade = new Trade();

                if (await _userService.GetUserAsync(tradeRequest.BuyerId) == null)
                {
                    return NotFound("Buyer not found");
                }

                var seller = await _userService.GetUserAsync(tradeRequest.SellerId[index]);
                var ownsGiftcard = await _userService.SellerOwnerOfGiftCardAsync(tradeRequest.SellerId[index], tradeRequest.GiftcardId[index]);
                if (seller == null || !ownsGiftcard)
                {
                    return NotFound("Seller not found / doesn't own giftcard");
                }

                var giftcard = await _giftcardService.GetGiftCardAsync(tradeRequest.GiftcardId[index]);
                if (giftcard == null || giftcard.Sold)
                {
                    return NotFound("Giftcard not found / already sold");
                }

                trade.SellerId = tradeRequest.SellerId[index];
                trade.BuyerId = tradeRequest.BuyerId;
                trade.SoldCardId = tradeRequest.GiftcardId[index];
                trade.PurchaseId = purchaseId;

                var soldGiftcard = await _giftcardService.GetGiftCardAsync(tradeRequest.GiftcardId[index]);
                soldGiftcard.Sold = true;
                await _giftcardService.UpdateGiftcardAsync(soldGiftcard);

                trades.Add(trade);
            }

            await _tradeService.TradeDoneAsyncReal(trades);
            return Ok(trades);
        }

        
    }
}