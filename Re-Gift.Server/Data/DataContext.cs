using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Giftcard> Giftcards { get; set; }
    public DbSet<Trade> Trades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().ToTable("Users");
        modelBuilder.Entity<Giftcard>().ToTable("Giftcards");
        modelBuilder.Entity<Trade>().ToTable("Trades");

        base.OnModelCreating(modelBuilder);
    }
}