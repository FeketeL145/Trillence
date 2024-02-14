using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace WebApplication3.Models;

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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
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
                .HasPrincipalKey<Song>(p => p.AlbumId)
                .HasForeignKey<Album>(d => d.Id)
                .HasConstraintName("Album ID - Song AlbumID");
        });

        modelBuilder.Entity<Artist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("artists");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Artist)
                .HasPrincipalKey<ArtistAlbum>(p => p.AlbumId)
                .HasForeignKey<Artist>(d => d.Id)
                .HasConstraintName("Artist ID - Artist-Album AristID");

            entity.HasOne(d => d.Id1).WithOne(p => p.Artist)
                .HasPrincipalKey<ArtistSong>(p => p.SongId)
                .HasForeignKey<Artist>(d => d.Id)
                .HasConstraintName("Artist ID - Artist-Song ArtistID");
        });

        modelBuilder.Entity<ArtistAlbum>(entity =>
        {
            entity.HasKey(e => new { e.ArtistId, e.AlbumId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("artist-album");

            entity.HasIndex(e => e.AlbumId, "AlbumID").IsUnique();

            entity.HasIndex(e => e.ArtistId, "ArtistID").IsUnique();

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

            entity.HasIndex(e => e.ArtistId, "ArtistID").IsUnique();

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
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Genre)
                .HasPrincipalKey<Song>(p => p.GenreId)
                .HasForeignKey<Genre>(d => d.Id)
                .HasConstraintName("Genre ID - Song GenreID");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("playlists");

            entity.HasIndex(e => e.UserId, "AK_playlists_UserID").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.UserId)
                .IsRequired()
                .HasColumnName("UserID")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Playlist)
                .HasPrincipalKey<PlaylistSong>(p => p.PlaylistId)
                .HasForeignKey<Playlist>(d => d.Id)
                .HasConstraintName("Playlist ID - Playlist-Song PlaylistID");
        });

        modelBuilder.Entity<PlaylistSong>(entity =>
        {
            entity.HasKey(e => new { e.PlaylistId, e.SongId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("playlist-song");

            entity.HasIndex(e => e.PlaylistId, "PlaylistID").IsUnique();

            entity.HasIndex(e => e.SongId, "SongID").IsUnique();

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

            entity.HasIndex(e => e.AlbumId, "AK_songs_Album1ID").IsUnique();

            entity.HasIndex(e => e.GenreId, "AK_songs_Genre1ID").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.AlbumId)
                .IsRequired()
                .HasColumnName("AlbumID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.GenreId)
                .IsRequired()
                .HasColumnName("GenreID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Length).HasColumnType("time");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Song)
                .HasPrincipalKey<ArtistSong>(p => p.SongId)
                .HasForeignKey<Song>(d => d.Id)
                .HasConstraintName("Song ID - Artist-Song SongID");

            entity.HasOne(d => d.Id1).WithOne(p => p.Song)
                .HasPrincipalKey<PlaylistSong>(p => p.SongId)
                .HasForeignKey<Song>(d => d.Id)
                .HasConstraintName("Song ID - Playlist-Song SongID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Name, "Name").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID")
                .UseCollation("utf8_hungarian_ci");
            entity.Property(e => e.Name)
                .HasColumnType("tinytext")
                .UseCollation("utf8_hungarian_ci");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.User)
                .HasPrincipalKey<Playlist>(p => p.UserId)
                .HasForeignKey<User>(d => d.Id)
                .HasConstraintName("User ID - Playlist UserID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
