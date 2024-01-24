using Microsoft.EntityFrameworkCore;
using tt_backend.Data;
using tt_backend.Model;

namespace tt_backend.Repository.AdRepo;

public class AdRepository : IAdRepository
{
    private readonly AppDbContext _context;

    public AdRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<Ad>> GetAll()
    {
        return await _context.Ads.ToListAsync();
    }
}