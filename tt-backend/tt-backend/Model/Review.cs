namespace tt_backend.Model;

public class Review
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Comments { get; set; }
    
    public string UserId { get; set; } // seller ID
    public AppUser User { get; set; } // buyer ID
    
    public int AdId { get; set; }
    public Ad Ad { get; set; }
    
}