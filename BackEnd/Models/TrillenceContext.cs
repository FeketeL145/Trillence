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

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<PlaylistSong> PlaylistSongs { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;database=trillence;user=root;sslmode=none", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("albums");

            entity.Property(e => e.Id)
                .HasColumnName("ID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.Image).HasColumnType("tinytext");
            entity.Property(e => e.Name).HasColumnType("tinytext");
            entity.Property(e => e.Released).HasColumnType("int(10) unsigned");
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

        modelBuilder.Entity<ArtistAlbum>(entity =>
        {
            entity.HasKey(e => e.ArtistId).HasName("PRIMARY");

            entity.ToTable("artist-album");

            entity.HasIndex(e => e.AlbumId, "AlbumID");

            entity.HasIndex(e => e.ArtistId, "ArtistID");

            entity.Property(e => e.ArtistId)
                .ValueGeneratedOnAdd()
                .HasColumnName("ArtistID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.AlbumId)
                .HasColumnName("AlbumID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");

            entity.HasOne(d => d.Album).WithMany(p => p.ArtistAlbums)
                .HasForeignKey(d => d.AlbumId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("artist-album_ibfk_1");

            entity.HasOne(d => d.Artist).WithOne(p => p.ArtistAlbum)
                .HasForeignKey<ArtistAlbum>(d => d.ArtistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("artist-album_ibfk_2");
        });

        modelBuilder.Entity<ArtistSong>(entity =>
        {
            entity.HasKey(e => e.ArtistId).HasName("PRIMARY");

            entity.ToTable("artist-song");

            entity.HasIndex(e => e.ArtistId, "ArtistID1");

            entity.HasIndex(e => e.SongId, "SongID");

            entity.Property(e => e.ArtistId)
                .ValueGeneratedOnAdd()
                .HasColumnName("ArtistID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.SongId)
                .HasColumnName("SongID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");

            entity.HasOne(d => d.Artist).WithOne(p => p.ArtistSong)
                .HasForeignKey<ArtistSong>(d => d.ArtistId)
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
            entity.HasKey(e => e.SongId).HasName("PRIMARY");

            entity.ToTable("playlist-song");

            entity.HasIndex(e => e.PlaylistId, "PlaylistID");

            entity.HasIndex(e => e.SongId, "SongID1");

            entity.Property(e => e.SongId)
                .ValueGeneratedOnAdd()
                .HasColumnName("SongID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");
            entity.Property(e => e.PlaylistId)
                .HasColumnName("PlaylistID")
                .UseCollation("ascii_general_ci")
                .HasCharSet("ascii");

            entity.HasOne(d => d.Playlist).WithMany(p => p.PlaylistSongs)
                .HasForeignKey(d => d.PlaylistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("playlist-song_ibfk_1");

            entity.HasOne(d => d.Song).WithOne(p => p.PlaylistSong)
                .HasForeignKey<PlaylistSong>(d => d.SongId)
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

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}