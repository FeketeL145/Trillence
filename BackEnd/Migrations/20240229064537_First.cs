using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "albums",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Image = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Released = table.Column<uint>(type: "int unsigned", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "artists",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "songs",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Length = table.Column<TimeSpan>(type: "time", nullable: true),
                    AlbumID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Genre = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "artist-album",
                columns: table => new
                {
                    ArtistID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    AlbumID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ArtistID);
                    table.ForeignKey(
                        name: "artist-album_ibfk_1",
                        column: x => x.AlbumID,
                        principalTable: "albums",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "artist-album_ibfk_2",
                        column: x => x.ArtistID,
                        principalTable: "artists",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "artist-song",
                columns: table => new
                {
                    ArtistID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    SongID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ArtistID);
                    table.ForeignKey(
                        name: "artist-song_ibfk_1",
                        column: x => x.ArtistID,
                        principalTable: "artists",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "artist-song_ibfk_2",
                        column: x => x.SongID,
                        principalTable: "songs",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "playlists",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.ForeignKey(
                        name: "playlists_ibfk_1",
                        column: x => x.UserID,
                        principalTable: "users",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "playlist-song",
                columns: table => new
                {
                    SongID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PlaylistID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.SongID);
                    table.ForeignKey(
                        name: "playlist-song_ibfk_1",
                        column: x => x.PlaylistID,
                        principalTable: "playlists",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "playlist-song_ibfk_2",
                        column: x => x.SongID,
                        principalTable: "songs",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "AlbumID",
                table: "artist-album",
                column: "AlbumID");

            migrationBuilder.CreateIndex(
                name: "ArtistID",
                table: "artist-album",
                column: "ArtistID");

            migrationBuilder.CreateIndex(
                name: "ArtistID1",
                table: "artist-song",
                column: "ArtistID");

            migrationBuilder.CreateIndex(
                name: "SongID",
                table: "artist-song",
                column: "SongID");

            migrationBuilder.CreateIndex(
                name: "PlaylistID",
                table: "playlist-song",
                column: "PlaylistID");

            migrationBuilder.CreateIndex(
                name: "SongID1",
                table: "playlist-song",
                column: "SongID");

            migrationBuilder.CreateIndex(
                name: "UserID",
                table: "playlists",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "artist-album");

            migrationBuilder.DropTable(
                name: "artist-song");

            migrationBuilder.DropTable(
                name: "playlist-song");

            migrationBuilder.DropTable(
                name: "albums");

            migrationBuilder.DropTable(
                name: "artists");

            migrationBuilder.DropTable(
                name: "playlists");

            migrationBuilder.DropTable(
                name: "songs");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
