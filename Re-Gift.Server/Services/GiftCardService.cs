using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.Helpers;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Services;

public class GiftCardService : IGiftCardService
{
    private readonly DataContext _context;

    public GiftCardService(DataContext Context)
    {
        _context = Context;
    }
    public async Task<ICollection<GiftCard>> GetGiftCardsAsync()
    {
        try
        {
            return await _context.Giftcards.ToListAsync();
        }
        catch (Exception)
        {

            throw;
        }

        
    }

    public async Task<GiftCard> GetGiftCardAsync(int id)
    {
        try
        {
           var gotGift = await _context.Giftcards.FirstOrDefaultAsync(g => g.Id == id);

            if (gotGift == null) 
            {
                throw new ArgumentException($"No Giftcard with id NR: {id} exists"); 
            }
            return gotGift;
        }
        catch (Exception)
        {

            throw;
        }

        
    }

    public async Task<ICollection<GiftCard>> GetGiftCardsFromUserIdAsync(int userId)
    {
        try
        {
            
            var giftCards = await _context.Giftcards
                                          .Where(gc => gc.userId == userId)
                                          .ToListAsync();

            if (!giftCards.Any())
            {
                throw new ArgumentException($"No gift cards found for user with ID {userId}");
            }

            return giftCards;
        }
        catch (Exception ex)
        {
            
            throw;
        }
    }


    public async Task<bool> AddGiftCardAsync(GiftCard giftcard)
    {
        _context.Add(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> AddGiftCardAsync(GiftCard giftcard, int userId, int companyEnum)
    {
        var userTied = await _context.Users.Include(u => u.GiftCards).FirstOrDefaultAsync(u => u.Id == userId);

        if (userTied == null)
        {
            throw new ArgumentNullException(nameof(userId), $"No user with Id {userId} found");
        }

        giftcard.userId = userId;
        giftcard.User = userTied;
        giftcard.Company = EnumsHelp.GetCompanyName(companyEnum);


        userTied.GiftCards.Add(giftcard);

        _context.Add(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> UpdateGiftcardAsync(GiftCard giftcard)
    {
        _context.Update(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> DeleteGiftCardAsync(GiftCard giftcard)
    {
        _context.Remove(giftcard);
        return await SaveAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }



    // -------------------------------------------------------------
    //  Experiment ignorera!!!!!!!!



    public async Task<ICollection<GiftCard>> GetFilteredGC(int choice)
    {
        string filter = EnumsHelp.GetFilteringName(choice);

        
        var giftCards = await _context.Giftcards.ToListAsync();

        
        switch (filter)
        {
            case "LowToHighPrice":
                giftCards = giftCards.OrderBy(gc => gc.Balance).ToList();
                break;

            case "HighToLowPrice":
                giftCards = giftCards.OrderByDescending(gc => gc.Balance).ToList();
                break;

            case "Oldest":
                giftCards = giftCards.OrderBy(gc => gc.ExpireDate).ToList();
                break;

            case "Newest":
                giftCards = giftCards.OrderByDescending(gc => gc.ExpireDate).ToList();
                break;

            case "ABC":
                giftCards = giftCards.OrderBy(gc => gc.Company).ToList();
                break;

            case "ZXC":
                giftCards = giftCards.OrderByDescending(gc => gc.Company).ToList();
                break;

            default:
                throw new ArgumentException("Invalid filter choice");
        }

        asgsgsg
        
        return giftCards;
    }

    // Experiment som skall vara i controller


    /*
    //[HttpGet("/api/filtering")] om det var en fromqeury hade urlen sett ut såhär "/api/filtering?id=5"
    [HttpGet("filtering/{id}")]
    public async Task<IActionResult> GetFiltered(int id)
    {
        var filtered = await _giftcardService.GetFilteredGC(id);

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        return Ok(filtered);
    }

    */






}