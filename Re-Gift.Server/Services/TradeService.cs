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

        public bool Save()
        {
            var save = _context.SaveChanges();
            return save > 0 ? true : false;


        }

        public bool UpdateTrade(Trade trade)
        {
            _context.Update(trade);
            return Save();

        }
    }
}
