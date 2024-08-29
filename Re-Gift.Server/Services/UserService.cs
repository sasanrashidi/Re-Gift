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
        public bool DeleteUser(User user)
        {
            _context.Remove(user);
            return Save();

        }

        public User GetUser(int id)
        {
            return _context.Users.Where(g => g.Id == id).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.ToList();

        }

        public bool Save()
        {
            var save = _context.SaveChanges();
            return save > 0 ? true : false;


        }

        public bool UpdateUser(User user)
        {
            _context.Update(user);
            return Save();

        }
    }
}
