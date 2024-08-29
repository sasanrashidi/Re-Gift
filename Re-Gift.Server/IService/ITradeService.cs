using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService
{
    public interface ITradeService
    {
        public ICollection<Trade> GetTrades();

        public Trade GetTrade(int id);

        public bool DeleteTrade(Trade trade);

        public bool UpdateTrade(Trade trade);
        public bool Save();

    }
}
