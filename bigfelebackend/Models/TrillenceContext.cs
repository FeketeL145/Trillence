using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models;

public partial class TrillenceContext : DbContext
{
    public TrillenceContext()
    {
    }

    public TrillenceContext(DbContextOptions<TrillenceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Song> Songs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            string conn = "server=localhost; database=trillencealpha; user=root; password=";

            optionsBuilder.UseMySql(conn, ServerVersion.AutoDetect(conn));
        }
    }
}