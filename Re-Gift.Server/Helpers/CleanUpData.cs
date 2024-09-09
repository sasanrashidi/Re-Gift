using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Identity.Client;
using Re_Gift.Server.Data;

namespace Re_Gift.Server.Helpers;

public class CleanUpData
{
    private readonly DataContext _context;

    public CleanUpData(DataContext context)
    {
        _context = context;
    }

    public async Task CleanAllDataAsync()
    {
        // List all the tables in the correct deletion order (child tables first)
        var tables = new[] { "Users", "Trades", "Giftcards" };

        foreach (var table in tables)
        {
            // Disable constraints on the table
            await _context.Database.ExecuteSqlRawAsync($"ALTER TABLE {table} NOCHECK CONSTRAINT ALL");

            // Clear data from the table
            await _context.Database.ExecuteSqlRawAsync($"DELETE FROM {table}");

            // Re-enable constraints on the table
            await _context.Database.ExecuteSqlRawAsync($"ALTER TABLE {table} WITH CHECK CHECK CONSTRAINT ALL");
        }
    }
}
