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

    public virtual DbSet<ArtistAlbum> ArtistAlbums { get; set; }

    public virtual DbSet<ArtistSong> ArtistSongs { get; set; }

    public virtual DbSet<Genre> Genres { get; set; }

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<PlaylistSong> PlaylistSongs { get; set; }

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

            entity.ToTable("albums");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Image)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Album)
                .HasPrincipalKey<ArtistAlbum>(p => p.AlbumId)
                .HasForeignKey<Album>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Album ID - ArtistAlbum AlbumID");
        });

        modelBuilder.Entity<Artist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("artists");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");
        });

        modelBuilder.Entity<ArtistAlbum>(entity =>
        {
            entity.HasKey(e => new { e.ArtistId, e.AlbumId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("artist-album");

            entity.HasIndex(e => e.AlbumId, "AlbumID").IsUnique();

            entity.Property(e => e.ArtistId)
                .HasColumnName("ArtistID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.AlbumId)
                .HasColumnName("AlbumID")
                .UseCollation("utf8_hungarian_ci");
        });

        modelBuilder.Entity<ArtistSong>(entity =>
        {
            entity.HasKey(e => new { e.ArtistId, e.SongId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("artist-song");

            entity.HasIndex(e => e.SongId, "SongID").IsUnique();

            entity.Property(e => e.ArtistId)
                .HasColumnName("ArtistID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.SongId)
                .HasColumnName("SongID")
                .UseCollation("utf8_hungarian_ci");
        });

        modelBuilder.Entity<Genre>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("genres");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("playlists");

            entity.HasIndex(e => e.UserId, "AK_playlists_UserID").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.UserId)
                .HasColumnName("UserID")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.User).WithOne(p => p.Playlist)
                .HasForeignKey<Playlist>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Playlist UserID - User ID");
        });

        modelBuilder.Entity<PlaylistSong>(entity =>
        {
            entity.HasKey(e => new { e.PlaylistId, e.SongId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("playlist-song");

            entity.HasIndex(e => e.SongId, "SongID1").IsUnique();

            entity.Property(e => e.PlaylistId)
                .HasColumnName("PlaylistID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.SongId)
                .HasColumnName("SongID")
                .UseCollation("utf8_hungarian_ci");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("songs");

            entity.HasIndex(e => e.AlbumId, "AK_songs_AlbumID").IsUnique();

            entity.HasIndex(e => e.GenreId, "AK_songs_GenreID").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.AlbumId)
                .HasColumnName("AlbumID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.GenreId)
                .HasColumnName("GenreID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Length).HasColumnType("time");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.Album).WithOne(p => p.Song)
                .HasForeignKey<Song>(d => d.AlbumId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Song AlbumID - Album ID");

            entity.HasOne(d => d.Genre).WithOne(p => p.Song)
                .HasForeignKey<Song>(d => d.GenreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Song GenreID - Genre ID");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Song)
                .HasPrincipalKey<ArtistSong>(p => p.SongId)
                .HasForeignKey<Song>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Song ID - ArtistSong SongID");

            entity.HasOne(d => d.Id1).WithOne(p => p.Song)
                .HasPrincipalKey<PlaylistSong>(p => p.SongId)
                .HasForeignKey<Song>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Song ID - PlaylistSong SongID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}