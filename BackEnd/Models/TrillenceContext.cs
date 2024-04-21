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

    public virtual DbSet<Album> Albums { get; set; }

    public virtual DbSet<Artist> Artists { get; set; }

    public virtual DbSet<ArtistSong> ArtistSongs { get; set; }

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<PlaylistSong> PlaylistSongs { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Verification> Verifications { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseMySql(config.GetConnectionString("Trillence"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("albums");

            entity.HasIndex(e => e.ArtistId, "Album ArtistID - Artist ID");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.ArtistId)
                .HasColumnName("ArtistID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.Name).HasColumnType("tinytext");
            entity.Property(e => e.Released).HasColumnType("int(10) unsigned");

            entity.HasOne(d => d.Artist).WithMany(p => p.Albums)
                .HasForeignKey(d => d.ArtistId)
                .HasConstraintName("Album ArtistID - Artist ID");
        });

        modelBuilder.Entity<Artist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("artists");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.Name).HasColumnType("tinytext");
        });

        modelBuilder.Entity<ArtistSong>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("artist-song");

            entity.HasIndex(e => e.ArtistId, "ArtistID1");

            entity.HasIndex(e => e.SongId, "SongID");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20)")
                .HasColumnName("ID");
            entity.Property(e => e.ArtistId)
                .HasColumnName("ArtistID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.SongId)
                .HasColumnName("SongID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");

            entity.HasOne(d => d.Artist).WithMany(p => p.ArtistSongs)
                .HasForeignKey(d => d.ArtistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("artist-song_ibfk_1");

            entity.HasOne(d => d.Song).WithMany(p => p.ArtistSongs)
                .HasForeignKey(d => d.SongId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("artist-song_ibfk_2");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("playlists");

            entity.HasIndex(e => e.UserId, "UserID");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.Name).HasColumnType("tinytext");
            entity.Property(e => e.UserId)
                .HasColumnName("UserID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");

            entity.HasOne(d => d.User).WithMany(p => p.Playlists)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("playlists_ibfk_1");
        });

        modelBuilder.Entity<PlaylistSong>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("playlist-song");

            entity.HasIndex(e => e.PlaylistId, "PlaylistID");

            entity.HasIndex(e => e.SongId, "SongID1");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20)")
                .HasColumnName("ID");
            entity.Property(e => e.PlaylistId)
                .HasColumnName("PlaylistID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.SongId)
                .HasColumnName("SongID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");

            entity.HasOne(d => d.Playlist).WithMany(p => p.PlaylistSongs)
                .HasForeignKey(d => d.PlaylistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("playlist-song_ibfk_1");

            entity.HasOne(d => d.Song).WithMany(p => p.PlaylistSongs)
                .HasForeignKey(d => d.SongId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("playlist-song_ibfk_2");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("songs");

            entity.HasIndex(e => e.AlbumId, "Song AlbumID - Album ID");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.AlbumId)
                .HasColumnName("AlbumID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.Genre).HasColumnType("tinytext");
            entity.Property(e => e.Length).HasColumnType("time");
            entity.Property(e => e.Name).HasColumnType("tinytext");

            entity.HasOne(d => d.Album).WithMany(p => p.Songs)
                .HasForeignKey(d => d.AlbumId)
                .HasConstraintName("Song AlbumID - Album ID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.Name).HasColumnType("tinytext");
        });

        modelBuilder.Entity<Verification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("verification");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Code)
                .HasMaxLength(6)
                .HasColumnName("code");
            entity.Property(e => e.Email)
                .HasMaxLength(320)
                .HasColumnName("email");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}