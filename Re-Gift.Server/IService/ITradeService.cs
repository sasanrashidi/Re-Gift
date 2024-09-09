﻿using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface ITradeService
{
    public Task<ICollection<Trade>> GetTradesAsync();

    public Task<Trade> GetTradeAsync(int id);

    //public Task<ICollection<Trade>> GetTradesFromUserId(int id);              // INTE TILLAGD I TRADECONTROLLER

    public Task<bool> TradeDoneAsync(List<User> users, List<GiftCard> giftCards);

    public Task<bool> UpdateTradeAsync(Trade trade);

    public Task<bool> TradeDoneAsyncReal(Trade trade);


    public Task<bool> DeleteTradeAsync(Trade trade);
    
    public Task<bool> SaveAsync();
}
