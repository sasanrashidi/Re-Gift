using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Services;

public class TradeService : ITradeService
{
    private readonly DataContext _context;

    public TradeService(DataContext Context)
    {
        _context = Context;
    }

    public async Task<ICollection<Trade>> GetTradesAsync()
    {
        return await _context.Trades.ToListAsync();
    }

    public async Task<Trade> GetTradeAsync(int id)
    {
        return await _context.Trades.Where(g => g.Id == id).FirstOrDefaultAsync();
    }

    //public async Task<ICollection<Trade>> GetTradesFromUserId(int userId)
    //{
    //    return await _context.Trades
    //                   .Where(t => t.Users.Any(u => u.Id == userId))
    //                   .ToListAsync();
    //}

    public async Task<bool> TradeDoneAsync(List<User> users, List<GiftCard> giftCards)
    {
        Trade tradeDone = new Trade
        {
            User1Id = users[0].Id,
            User2Id = users[1].Id,
            SoldGFId = giftCards[0].Id,
        };

        _context.Trades.Add(tradeDone);

        return await SaveAsync();
    }

    public async Task<bool> TradeDoneAsyncReal(Trade trade)
    {
        _context.Trades.Add(trade);

        return await SaveAsync();
    }

    public async Task<bool> UpdateTradeAsync(Trade trade)
    {
        _context.Update(trade); // Tvek om vi kommer använda denna
        return await SaveAsync();
    }

    public async Task<bool> DeleteTradeAsync(Trade trade)
    {
        _context.Remove(trade);
        return await SaveAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}

// FuskLapp

/*

 [HttpPost("CreateTrade")]
        public async Task<IActionResult> CreateTrade(int BuyerId, int sellerId, int giftCardId)
        {
            var buyer = await _userService.GetUserAsync(BuyerId);
            if (buyer == null) return NotFound("Buyer not found");

            if (BuyerId == sellerId)
            {
                return BadRequest("Buyer cannot be the same as the seller");
            }

            var seller = await _userService.GetUserAsync(sellerId);
            if (seller == null) return NotFound("Seller not found");

            var isOwner = await _userService.SellerOwnerOfGiftCardAsync(sellerId, giftCardId);
            if (!isOwner) return BadRequest("Seller does not own this gift card");

            var giftcard = await _giftCardService.GetGiftCardAsync(giftCardId);
            if (giftcard == null || giftcard.Sold == true) return NotFound("Giftcard not found, or sold");

            giftcard.Sold = true;
            await _giftCardService.UpdateGiftcardAsync(giftcard);

            var tradeToCreate = new TradeDto
            {
                User1Id = BuyerId,
                User2Id = sellerId,
                GF1Id = giftCardId
            };

            var traded = _mapper.Map<Trade>(tradeToCreate);
            await _tradeService.TradeDoneAsyncReal(traded);

            return Ok(tradeToCreate);
        }

 */