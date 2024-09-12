using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<GiftCard> Giftcards { get; set; }
    public DbSet<Trade> Trades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure one-to-many relationship between User and Giftcard
        modelBuilder.Entity<GiftCard>()
            .HasOne(g => g.User)
            .WithMany(u => u.GiftCards)
            .HasForeignKey(g => g.UserId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}