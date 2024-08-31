using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.SeedData
{
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
                new User { Email = "user1@example.com", Password = "password123" },
                new User { Email = "user2@example.com", Password = "password456" },
                new User { Email = "user3@example.com", Password = "password78912" },
                new User { Email = "user4@example.com", Password = "password7893223" },
                new User { Email = "user5@example.com", Password = "password7895435" },
                new User { Email = "user6@example.com", Password = "password789423543" }
            };

                await _context.Users.AddRangeAsync(users);
                await _context.SaveChangesAsync();
            }

            // Seed Giftcards
            if (!_context.Giftcards.Any())
            {
                var users = await _context.Users.ToListAsync(); // Ensure users are retrieved after seeding

                var giftcards = new List<Giftcard>
            {
                new Giftcard
                {
                    Company = "Amazon",
                    ExpireDate = DateTime.Now.AddYears(1),
                    Balance = 500,
                    SerialNumber = "AMZ123",
                    User = users.FirstOrDefault(), // Ensure this user exists
                    Verified = true,
                    Sold = true,
                },
                new Giftcard
                {
                    Company = "Ica",
                    ExpireDate = DateTime.Now.AddYears(1),
                    Balance = 1000,
                    SerialNumber = "ICA456",
                    User = users.Skip(1).FirstOrDefault(), // Ensure this user exists
                    Verified = true,
                    Sold = true,
                },
                 new Giftcard
                {
                    Company = "Ikea",
                    ExpireDate = DateTime.Now.AddYears(1),
                    Balance = 10000,
                    SerialNumber = "IKE456",
                    User = users.Skip(2).FirstOrDefault(), // Ensure this user exists
                    Verified = true,
                    Sold = true,
                },
                  new Giftcard
                {
                    Company = "GameStop",
                    ExpireDate = DateTime.Now.AddYears(1),
                    Balance = 600,
                    SerialNumber = "GSM456",
                    User = users.Skip(3).FirstOrDefault(), // Ensure this user exists
                    Verified = true,
                    Sold = true,
                },
                   new Giftcard
                {
                    Company = "Filmstaden",
                    ExpireDate= DateTime.Now.AddYears(1),
                    Balance = 300,
                    SerialNumber = "FIL456",
                    User = users.Skip(4).FirstOrDefault() // Ensure this user exists
                },
                    new Giftcard
                {
                    Company = "McDonalds",
                    ExpireDate = DateTime.Now.AddYears(1),
                    Balance = 500,
                    SerialNumber = "MCD456",
                    User = users.Skip(5).FirstOrDefault() // Ensure this user exists
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
                    User1Id = users[0].Id,
                    User2Id = users[1].Id,
                    GF1Id = giftcards[0].Id,
                    GF2Id = giftcards[1].Id,

                    

                    
                },
                new Trade
                {
                    TransactionDate = DateTime.Now,                    
                    User1Id = users[2].Id,
                    User2Id = users[3].Id,
                    GF1Id = giftcards[2].Id,
                    GF2Id = giftcards[4].Id,

                }
            };

                await _context.Trades.AddRangeAsync(trades);
                await _context.SaveChangesAsync();
            }
        }
    }
}
