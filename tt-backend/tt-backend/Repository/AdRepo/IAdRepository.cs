using tt_backend.Model;

namespace tt_backend.Repository.AdRepo;

public interface IAdRepository 
{
    Task<IEnumerable<Ad>> GetAll();
    Task Create(Ad ad);

    Task<Ad?> GetById(int id);
    Task<IEnumerable<Ad>> GetAllByUserId(string id);
    Task Delete(Ad ad);
}