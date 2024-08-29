using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService
{
    public interface ITradeService
    {
        public Trade GetTrades();

        public Trade GetTrade(int id);

        public void DeleteTrade(int id);

        public Trade UpdateTrade(int id);

    }
}
