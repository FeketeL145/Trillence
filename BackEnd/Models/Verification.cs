namespace BackEnd.Models;

public partial class Verification
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Email { get; set; } = null!;
}