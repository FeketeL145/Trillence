namespace BackEnd.Models;

public partial class User
{
    /// <summary>
    /// User ID.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Username.
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// User password.
    /// </summary>
    public string Password { get; set; } = null!;

    /// <summary>
    /// User birthdate.
    /// </summary>
    public DateOnly Birth { get; set; }

    public virtual Artist IdNavigation { get; set; } = null!;
}