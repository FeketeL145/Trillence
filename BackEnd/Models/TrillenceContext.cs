using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models
{
    public partial class TrillenceContext : DbContext
    {
        private readonly IConfiguration configuration;

        public TrillenceContext()
        {
        }

        public TrillenceContext(DbContextOptions<TrillenceContext> options, IConfiguration configuration)
            : base(options)
        {
            configuration = configuration;
        }

        public virtual DbSet<Album> Albums { get; set; }
        public virtual DbSet<Artist> Artists { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
        public virtual DbSet<Song> Songs { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            try
            {
                if (!optionsBuilder.IsConfigured)
                {
                    string conn = "server = localhost; database = Trillence; user = root; password =";
                    optionsBuilder.UseMySql(conn, ServerVersion.AutoDetect(conn));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while configuring the DbContext: {ex.Message}");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("albums").UseCollation("utf8_hungarian_ci");

                entity.HasIndex(e => e.ArtistId, "ArtistID").IsUnique();
                entity.HasIndex(e => e.SongId, "SongID").IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasComment("Album ID.")
                    .HasColumnName("ID");

                entity.Property(e => e.ArtistId)
                    .HasComment("Artist ID.")
                    .HasColumnName("ArtistID");

                entity.Property(e => e.Listens)
                    .HasComment("Times somebody has listened to any of the songs from the album.")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Name)
                    .HasComment("Album name.")
                    .HasColumnType("tinytext");

                entity.Property(e => e.Released).HasComment("Album release date.");

                entity.Property(e => e.SongId)
                    .HasComment("Song ID.")
                    .HasColumnName("SongID");

                entity.HasOne(d => d.IdNavigation).WithOne(p => p.Album)
                    .HasPrincipalKey<Song>(p => p.AlbumId)
                    .HasForeignKey<Album>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Album ID - Song AlbumID");
            });

            modelBuilder.Entity<Artist>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("artists").UseCollation("utf8_hungarian_ci");

                entity.HasIndex(e => e.AlbumId, "AlbumID").IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasComment("Artist ID.")
                    .HasColumnName("ID");

                entity.Property(e => e.AlbumId)
                    .HasComment("Album ID.")
                    .HasColumnName("AlbumID");

                entity.HasOne(d => d.IdNavigation).WithOne(p => p.Artist)
                    .HasPrincipalKey<Song>(p => p.ArtistId)
                    .HasForeignKey<Artist>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Artist ID - Song ArtistID");
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("genres").UseCollation("utf8_hungarian_ci");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasComment("Genre ID.")
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasComment("Genre name.")
                    .HasColumnType("tinytext");

                entity.HasOne(d => d.IdNavigation).WithOne(p => p.Genre)
                    .HasPrincipalKey<Song>(p => p.GenreId)
                    .HasForeignKey<Genre>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Genre ID - Song GenreID");
            });

            modelBuilder.Entity<Song>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("songs").UseCollation("utf8_hungarian_ci");

                entity.HasIndex(e => e.AlbumId, "AlbumID").IsUnique();
                entity.HasIndex(e => e.ArtistId, "ArtistID").IsUnique();
                entity.HasIndex(e => e.GenreId, "GenreID").IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasComment("Song ID.")
                    .HasColumnName("ID");

                entity.Property(e => e.AlbumId)
                    .HasComment("Album ID.")
                    .HasColumnName("AlbumID");

                entity.Property(e => e.ArtistId)
                    .HasComment("Artist ID.")
                    .HasColumnName("ArtistID");

                entity.Property(e => e.Dislikes)
                    .HasComment("Song dislike amount.")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.GenreId)
                    .HasComment("Genre ID.")
                    .HasColumnName("GenreID");

                entity.Property(e => e.Length)
                    .HasComment("Song length.")
                    .HasColumnType("time");

                entity.Property(e => e.Likes)
                    .HasComment("Song like amount.")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Listens)
                    .HasComment("Times someone has listened to the song.")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Name)
                    .HasComment("Song name.")
                    .HasColumnType("tinytext");

                entity.HasOne(d => d.IdNavigation).WithOne(p => p.Song)
                    .HasPrincipalKey<Album>(p => p.SongId)
                    .HasForeignKey<Song>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Song ID - Album SongID");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("users").UseCollation("utf8_hungarian_ci");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasComment("User ID.")
                    .HasColumnName("ID");

                entity.Property(e => e.Birth).HasComment("User birthdate.");

                entity.Property(e => e.Name)
                    .HasComment("Username.")
                    .HasColumnType("tinytext");

                entity.Property(e => e.Password)
                    .HasComment("User password.")
                    .HasColumnType("tinytext");

                entity.HasOne(d => d.IdNavigation).WithOne(p => p.User)
                    .HasForeignKey<User>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("User ID - Artist ID");
            });
        }
    }
}