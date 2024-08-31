using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface ITradeService
{
    public Task<ICollection<Trade>> GetTrades();

    public Task<Trade> GetTrade(int id);

    public Task<bool> DeleteTrade(Trade trade);

    public Task<bool> UpdateTrade(Trade trade);
    

    public Task<bool> TradeDone(List<User> users, List<Giftcard> giftCards);
    
    /*
    public Task<ICollection<Trade>> GetTradesFromUserId(int id);
    */

    public Task<bool> Save();
}
