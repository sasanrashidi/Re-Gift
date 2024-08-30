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
        public bool DeleteTrade(Trade trade)
        {
            _context.Remove(trade);
            return Save();

        }



        public Trade GetTrade(int id)
        {
            return _context.Trades.Where(g => g.Id == id).FirstOrDefault();
        }

        public ICollection<Trade> GetTrades()
        {
            return _context.Trades.ToList();

        }

        
        public ICollection<Trade> GetTradesFromUserId(int userId)
        {
            return _context.Trades
                           .Where(t => t.Users.Any(u => u.Id == userId))
                           .ToList();
        }

        public bool Save()
        {
            var save = _context.SaveChanges();
            return save > 0 ? true : false;


        }

        public bool UpdateTrade(Trade trade)
        {
            _context.Update(trade); // Tvek om vi kommer använda denna
            return Save();

        }

        public bool TradeDone(List<User> users, List<Giftcard> giftCards)
        {
            Trade tradeDone = new Trade
            {
                Users = users,
                Giftcards = giftCards
            };

            _context.Trades.Add(tradeDone);

            return Save();


        }
    }
}
