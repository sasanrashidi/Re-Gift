using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.Helpers;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.SeedData;

public class Seed
{
    private readonly DataContext _context;

    public Seed(DataContext context)
    {
        _context = context;
    }

    public async Task SeedDatabaseAsync()
    {
        // Seed Users
        if (!_context.Users.Any())
        {
            var users = new List<User>
        {
            new User { Email = "user1@example.com", Password = "password123", FirstName = "John", LastName = "Doe" },
            new User { Email = "user2@example.com", Password = "password456", FirstName = "Jane", LastName = "Doe" },
            new User { Email = "user3@example.com", Password = "password78912", FirstName = "Bob", LastName = "Smith" },
            new User { Email = "user4@example.com", Password = "password7893223", FirstName = "Alice", LastName = "Smith" },
            new User { Email = "user5@example.com", Password = "password7895435", FirstName = "Mike", LastName = "Johnson" },
            new User { Email = "user6@example.com", Password = "password789423543", FirstName = "Sarah", LastName = "Johnson" },
        };

            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();
        }

        // Seed Giftcards
        if (!_context.Giftcards.Any())
        {
            var users = await _context.Users.ToListAsync(); // Ensure users are retrieved after seeding

            var giftcards = new List<GiftCard>
        {
            new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(2),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 500,
                DiscountPercentage = EnumsHelp.GetPercentage(0),
                SerialNumber = new Guid().ToString(),
                User = users.FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = true,
            },

            new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(1),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 1000,
                DiscountPercentage = EnumsHelp.GetPercentage(2),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(1).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = true,
            },

             new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(11),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 10000,
                DiscountPercentage = EnumsHelp.GetPercentage(1),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(2).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },

              new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(2),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 600,
                DiscountPercentage = EnumsHelp.GetPercentage(1),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(3).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },

               new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(8),
                ExpireDate= DateTime.Now.AddYears(1),
                Balance = 300,
                DiscountPercentage = EnumsHelp.GetPercentage(0),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(4).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },

                new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(10),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 500,
                DiscountPercentage = EnumsHelp.GetPercentage(2),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(5).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },
                new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(2),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 500,
                DiscountPercentage = EnumsHelp.GetPercentage(0),
                SerialNumber = new Guid().ToString(),
                User = users.FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = true,
            },

            new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(1),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 1000,
                DiscountPercentage = EnumsHelp.GetPercentage(2),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(1).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = true,
            },

             new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(11),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 10000,
                DiscountPercentage = EnumsHelp.GetPercentage(1),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(2).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },

              new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(2),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 600,
                DiscountPercentage = EnumsHelp.GetPercentage(1),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(3).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },

               new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(8),
                ExpireDate= DateTime.Now.AddYears(1),
                Balance = 300,
                DiscountPercentage = EnumsHelp.GetPercentage(0),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(4).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },

                new GiftCard
            {
                Company = EnumsHelp.GetCompanyName(10),
                ExpireDate = DateTime.Now.AddYears(1),
                Balance = 500,
                DiscountPercentage = EnumsHelp.GetPercentage(2),
                SerialNumber = new Guid().ToString(),
                User = users.Skip(5).FirstOrDefault(), // Ensure this user exists
                Verified = true,
                Sold = false,
            },
        };

            await _context.Giftcards.AddRangeAsync(giftcards);
            await _context.SaveChangesAsync();
        }

        // Seed Trades (Ensure giftcards are correctly assigned or newly created if needed)
        if (!_context.Trades.Any())
        {
            var users = await _context.Users.ToListAsync(); // Ensure users are retrieved
            var giftcards = await _context.Giftcards.ToListAsync();

            var trades = new List<Trade>
        {
            new Trade
            {
                TransactionDate = DateTime.Now,
                SellerId = users[0].Id,
                BuyerId = users[1].Id,
                SoldCardId = giftcards[0].Id,
                PurchaseId = new Guid()
            },
            new Trade
            {
                TransactionDate = DateTime.Now,
                SellerId = users[2].Id,
                BuyerId = users[3].Id,
                SoldCardId = giftcards[1].Id,
                PurchaseId = new Guid()
            }
        };

            await _context.Trades.AddRangeAsync(trades);
            await _context.SaveChangesAsync();
        }
    }
}