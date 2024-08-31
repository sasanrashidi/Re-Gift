using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Services
{
    public class TradeService : ITradeService
    {
        private readonly DataContext _context;
        public TradeService(DataContext Context)
        {
            _context = Context;
        }
        public async Task<bool> DeleteTrade(Trade trade)
        {
            _context.Remove(trade);
            return await Save();

        }



        public async Task<Trade> GetTrade(int id)
        {
            return await _context.Trades.Where(g => g.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Trade>> GetTrades()
        {
            return await _context.Trades.ToListAsync();

        }

        /*
        public async Task<ICollection<Trade>> GetTradesFromUserId(int userId)
        {
            return await _context.Trades
                           .Where(t => t.Users.Any(u => u.Id == userId))
                           .ToListAsync();
        }
        */

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateTrade(Trade trade)
        {
            _context.Update(trade); // Tvek om vi kommer använda denna
            return await Save();

        }
        
        public async Task<bool> TradeDone(List<User> users, List<Giftcard> giftCards)
        {
            Trade tradeDone = new Trade
            {
                User1Id = users[0].Id,
                User2Id = users[1].Id,
                GF1Id = giftCards[0].Id,
                GF2Id = giftCards[1].Id,
                
            };

            _context.Trades.Add(tradeDone);

            return await Save();


        }
        
    }
}
