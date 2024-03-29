﻿using Microsoft.EntityFrameworkCore;
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
        return await _context.Ads.Include(ad => ad.Seller).Include(ad => ad.Images).AsNoTracking().ToListAsync();
    }

    public async Task Create(Ad ad)
    {
        await _context.AddAsync(ad);
        await _context.SaveChangesAsync();
    }

    public async Task<Ad?> GetById(int id)
    {
        return await _context.Ads.Include(ad => ad.Seller).Include(ad => ad.Images).FirstOrDefaultAsync(c => c.Id == (uint)id);
    }

    public async Task<IEnumerable<Ad>> GetAllByUserId(string id)
    {
        return await _context.Ads.Include(ad => ad.Seller).Include(ad => ad.Images).Where(ad => ad.Seller.Id == id).ToListAsync();
    }

    public async Task Delete(Ad ad)
    {
        _context.Ads.Remove(ad);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Ad ad)
    {
        _context.Entry(ad).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}