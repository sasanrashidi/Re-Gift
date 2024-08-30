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
                    User = users.FirstOrDefault() // Ensure this user exists
                },
                new Giftcard
                {
                    Company = "Costco",
                    ExpireDate = DateTime.Now.AddYears(1),
                    Balance = 1000,
                    SerialNumber = "WAL456",
                    User = users.Skip(1).FirstOrDefault() // Ensure this user exists
                },
                // Add other giftcards with appropriate user assignments
            };

                await _context.Giftcards.AddRangeAsync(giftcards);
                await _context.SaveChangesAsync();
            }

            // Seed Trades (Ensure giftcards are correctly assigned or newly created if needed)
            if (!_context.Trades.Any())
            {
                var users = await _context.Users.ToListAsync(); // Ensure users are retrieved

                var trades = new List<Trade>
            {
                new Trade
                {
                    TransactionDate = DateTime.Now,
                    Giftcards = new List<Giftcard>
                    {
                        new Giftcard { Company = "Amazon", ExpireDate = DateTime.Now.AddDays(50), Balance = 500, SerialNumber = "TRADE1-AMZ", User = null },
                        new Giftcard { Company = "Walmart", ExpireDate = DateTime.Now.AddDays(23), Balance = 400, SerialNumber = "TRADE1-WAL", User = null }
                    },
                    Users = new List<User> { users.FirstOrDefault(), users.Skip(1).FirstOrDefault() }
                },
                new Trade
                {
                    TransactionDate = DateTime.Now,
                    Giftcards = new List<Giftcard>
                    {
                        new Giftcard { Company = "Elgiganten", ExpireDate = DateTime.Now.AddDays(30), Balance = 300, SerialNumber = "TRADE2-BBY", User = null },
                        new Giftcard { Company = "BAUHAUS", ExpireDate = DateTime.Now.AddDays(10), Balance = 700, SerialNumber = "TRADE2-BBY", User = null }
                    },
                    Users = new List<User> { users.Skip(2).FirstOrDefault(), users.Skip(3).FirstOrDefault() }
                }
            };

                await _context.Trades.AddRangeAsync(trades);
                await _context.SaveChangesAsync();
            }
        }
    }
}
