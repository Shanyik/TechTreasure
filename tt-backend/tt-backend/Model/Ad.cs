namespace tt_backend.Model;

public class Ad
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public string Condition { get; set; }
    public bool Sold { get; set; }
    public DateTime DatePosted { get; set; }
    public int Views { get; set; }
    public AppUser Seller { get; set; }
    public List<AdImage> Images { get; set; } // for cloud hosting storage
    
}