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

    public virtual DbSet<Genre> Genres { get; set; }

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<Playlistsong> Playlistsongs { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;database=trillence;user=root;sslmode=none", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8_general_ci")
            .HasCharSet("utf8");

        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("albums")
                .UseCollation("utf8_hungarian_ci");

            entity.HasIndex(e => e.UserId, "ArtistID").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasComment("Album ID.")
                .HasColumnName("ID");
            entity.Property(e => e.UserId)
                .HasComment("Artist ID.")
                .HasColumnName("ArtistID");
            entity.Property(e => e.Image).HasColumnType("tinytext");
            entity.Property(e => e.Name)
                .HasComment("Album name.")
                .HasColumnType("tinytext");
            entity.Property(e => e.Released).HasComment("Album release date.");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Album)
                .HasPrincipalKey<Song>(p => p.AlbumId)
                .HasForeignKey<Album>(d => d.Id)
                .HasConstraintName("Album ID - Song AlbumID");
        });

        modelBuilder.Entity<Genre>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("genres")
                .UseCollation("utf8_hungarian_ci");

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
                .HasConstraintName("Genre ID - Song GenreID");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("playlists")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_general_ci");

            entity.HasIndex(e => e.UserId, "UserID").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasComment("Playlist ID.")
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci")
                .HasCharSet("utf8");
            entity.Property(e => e.Name)
                .HasComment("Name of playlist.")
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci")
                .HasCharSet("utf8");
            entity.Property(e => e.UserId)
                .HasComment("User ID.")
                .HasColumnName("UserID")
                .UseCollation("utf8_hungarian_ci")
                .HasCharSet("utf8");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Playlist)
                .HasPrincipalKey<Playlistsong>(p => p.PlaylistId)
                .HasForeignKey<Playlist>(d => d.Id)
                .HasConstraintName("Playlist ID - Playlistsong PlaylistID");
        });

        modelBuilder.Entity<Playlistsong>(entity =>
        {
            entity.HasKey(e => new { e.SongId, e.PlaylistId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity
                .ToTable("playlistsong")
                .UseCollation("utf8_hungarian_ci");

            entity.HasIndex(e => e.PlaylistId, "PlaylistID").IsUnique();

            entity.HasIndex(e => e.SongId, "SongID").IsUnique();

            entity.Property(e => e.SongId)
                .HasComment("Song ID.")
                .HasColumnName("SongID");
            entity.Property(e => e.PlaylistId)
                .HasComment("Playlist ID.")
                .HasColumnName("PlaylistID");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("songs")
                .UseCollation("utf8_hungarian_ci");

            entity.HasIndex(e => e.AlbumId, "AK_songs_AlbumID").IsUnique();

            entity.HasIndex(e => e.UserId, "AK_songs_ArtistID").IsUnique();

            entity.HasIndex(e => e.GenreId, "AK_songs_GenreID").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasComment("Song ID.")
                .HasColumnName("ID");
            entity.Property(e => e.AlbumId)
                .HasComment("Album ID.")
                .HasColumnName("AlbumID");
            entity.Property(e => e.UserId)
                .HasComment("Artist ID.")
                .HasColumnName("ArtistID");
            entity.Property(e => e.GenreId)
                .HasComment("Genre ID.")
                .HasColumnName("GenreID");
            entity.Property(e => e.Length)
                .HasComment("Song length.")
                .HasColumnType("time");
            entity.Property(e => e.Name)
                .HasComment("Song name.")
                .HasColumnType("tinytext");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Song)
                .HasPrincipalKey<Playlistsong>(p => p.SongId)
                .HasForeignKey<Song>(d => d.Id)
                .HasConstraintName("Song ID - Playlistsong SongID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("users")
                .UseCollation("utf8_hungarian_ci");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasComment("User ID.")
                .HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasComment("Username.")
                .HasColumnType("tinytext");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.User)
                .HasPrincipalKey<Album>(p => p.UserId)
                .HasForeignKey<User>(d => d.Id)
                .HasConstraintName("User ID - Album ArtistID");

            entity.HasOne(d => d.Id1).WithOne(p => p.User)
                .HasPrincipalKey<Song>(p => p.UserId)
                .HasForeignKey<User>(d => d.Id)
                .HasConstraintName("User ID - Song ArtistID");

            entity.HasOne(d => d.Id2).WithOne(p => p.User)
                .HasPrincipalKey<Playlist>(p => p.UserId)
                .HasForeignKey<User>(d => d.Id)
                .HasConstraintName("User ID - Playlist UserID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}