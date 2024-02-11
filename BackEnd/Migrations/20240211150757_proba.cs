using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class proba : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.CreateTable(
                name: "playlistsong",
                columns: table => new
                {
                    SongID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Song ID.", collation: "ascii_general_ci"),
                    PlaylistID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Playlist ID.", collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.SongID, x.PlaylistID })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.UniqueConstraint("AK_playlistsong_PlaylistID", x => x.PlaylistID);
                    table.UniqueConstraint("AK_playlistsong_SongID", x => x.SongID);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "playlists",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Playlist ID.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "User ID.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, comment: "Name of playlist.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.UniqueConstraint("AK_playlists_UserID", x => x.UserID);
                    table.ForeignKey(
                        name: "Playlist ID - Playlistsong PlaylistID",
                        column: x => x.ID,
                        principalTable: "playlistsong",
                        principalColumn: "PlaylistID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "songs",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Song ID.", collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, comment: "Song name.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Length = table.Column<TimeOnly>(type: "time", nullable: false, comment: "Song length."),
                    ArtistID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Artist ID.", collation: "ascii_general_ci"),
                    AlbumID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Album ID.", collation: "ascii_general_ci"),
                    GenreID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Genre ID.", collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.UniqueConstraint("AK_songs_AlbumID", x => x.AlbumID);
                    table.UniqueConstraint("AK_songs_ArtistID", x => x.ArtistID);
                    table.UniqueConstraint("AK_songs_GenreID", x => x.GenreID);
                    table.ForeignKey(
                        name: "Song ID - Playlistsong SongID",
                        column: x => x.ID,
                        principalTable: "playlistsong",
                        principalColumn: "SongID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "albums",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Album ID.", collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, comment: "Album name.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Image = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Released = table.Column<DateOnly>(type: "date", nullable: false, comment: "Album release date."),
                    ArtistID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Artist ID.", collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.UniqueConstraint("AK_albums_ArtistID", x => x.ArtistID);
                    table.ForeignKey(
                        name: "Album ID - Song AlbumID",
                        column: x => x.ID,
                        principalTable: "songs",
                        principalColumn: "AlbumID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "genres",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "Genre ID.", collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, comment: "Genre name.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.ForeignKey(
                        name: "Genre ID - Song GenreID",
                        column: x => x.ID,
                        principalTable: "songs",
                        principalColumn: "GenreID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, comment: "User ID.", collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, comment: "Username.", collation: "utf8_hungarian_ci")
                        .Annotation("MySql:CharSet", "utf8")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                    table.ForeignKey(
                        name: "User ID - Album ArtistID",
                        column: x => x.ID,
                        principalTable: "albums",
                        principalColumn: "ArtistID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "User ID - Playlist UserID",
                        column: x => x.ID,
                        principalTable: "playlists",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "User ID - Song ArtistID",
                        column: x => x.ID,
                        principalTable: "songs",
                        principalColumn: "ArtistID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_hungarian_ci");

            migrationBuilder.CreateIndex(
                name: "ArtistID",
                table: "albums",
                column: "ArtistID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UserID",
                table: "playlists",
                column: "UserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "PlaylistID",
                table: "playlistsong",
                column: "PlaylistID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "SongID",
                table: "playlistsong",
                column: "SongID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "AK_songs_AlbumID",
                table: "songs",
                column: "AlbumID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "AK_songs_ArtistID",
                table: "songs",
                column: "ArtistID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "AK_songs_GenreID",
                table: "songs",
                column: "GenreID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "genres");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "albums");

            migrationBuilder.DropTable(
                name: "playlists");

            migrationBuilder.DropTable(
                name: "songs");

            migrationBuilder.DropTable(
                name: "playlistsong");
        }
    }
}
