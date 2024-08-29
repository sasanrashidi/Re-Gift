using Re_Gift.Server.Models;

namespace Re_Gift.Server.IService
{
    public interface IUserService
    {

        public User GetUsers();

        public User GetUser(int id);

        public void DeleteUser(int id);

        public User UpdateUser(int id);












    }
}
