using tt_backend.Model;

namespace tt_backend.Repository.AdRepo;

public interface IAdRepository 
{
    Task<IEnumerable<Ad>> GetAll();
}