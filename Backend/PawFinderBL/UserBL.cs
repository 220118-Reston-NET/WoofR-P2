using PawFinderModel;
using PawFinderDL;

namespace PawFinderBL;

public class UserBL : IUserBL
{
    private IRepository _repo;
    public UserBL(IRepository p_repo)
    {
        _repo = p_repo;
    }

    public List<User> GetAllUsers()
    {
        return _repo.GetAllUsers();
    }

    public User RegisterUser(User p_user)
    {
        return _repo.RegisterUser(p_user);

    }


}