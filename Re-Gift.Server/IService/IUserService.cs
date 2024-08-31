using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService;

public interface IUserService
{
    public Task<ICollection<User>> GetUsers();
    public Task<User> GetUser(int id);
    public Task<bool> CreateUser(User user);
    public Task<bool> DeleteUser(User user);
    public Task<bool> UpdateUser(User user);
    public Task<bool> Save();
}
