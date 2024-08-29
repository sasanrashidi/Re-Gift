using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface IUserService
{
    public ICollection<User> GetUsers();
    public User GetUser(int id);
    public bool DeleteUser(User user);
    public bool UpdateUser(User user);
    public bool Save();
}
