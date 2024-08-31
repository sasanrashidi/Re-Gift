using Microsoft.EntityFrameworkCore;
using Re_Gift.Server.Data;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        public UserService(DataContext Context)
        {
            _context = Context;
        }

        public async Task<bool> CreateUser(User user)
        {
            _context.Add(user);
            return await Save();
        }

        public async Task<bool> DeleteUser(User user)
        {
            _context.Remove(user);
            return await Save();
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Where(g => g.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();

        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;


        }

        public async Task<bool> UpdateUser(User user)
        {
            _context.Update(user);
            return await Save();

        }
    }
}
