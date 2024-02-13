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
        return await _context.Ads.Include(ad => ad.Seller).AsNoTracking().ToListAsync();
    }

    public async Task Add(Ad ad)
    {
        await _context.AddAsync(ad);
        await _context.SaveChangesAsync();
    }

    public async Task<Ad?> GetById(int id)
    {
        return await _context.Ads.FirstOrDefaultAsync(c => c.Id == (uint)id);
    }

    public async Task<IEnumerable<Ad>> GetAllByUserId(string id)
    {
        return await _context.Ads.Where(ad => ad.Seller.Id == id).ToListAsync();
    }
}