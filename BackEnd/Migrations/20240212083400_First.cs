using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace BackEnd.Migrations
{
    public partial class First : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_hungarian_ci");

            migrationBuilder.CreateTable(
                name: "playlistsong",
                columns: table => new
                {
                    SongID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    PlaylistID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_playlistsong", x => new { x.SongID, x.PlaylistID });
                    table.UniqueConstraint("AK_playlistsong_PlaylistID", x => x.PlaylistID);
                    table.UniqueConstraint("AK_playlistsong_SongID", x => x.SongID);
                });

            migrationBuilder.CreateTable(
                name: "playlists",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_playlists", x => x.ID);
                    table.UniqueConstraint("AK_playlists_UserID", x => x.UserID);
                    table.ForeignKey(
                        name: "Playlist ID - Playlistsong PlaylistID",
                        column: x => x.ID,
                        principalTable: "playlistsong",
                        principalColumn: "PlaylistID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "songs",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci"),
                    Length = table.Column<TimeSpan>(type: "time", nullable: false),
                    ArtistID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    AlbumID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    GenreID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_songs", x => x.ID);
                    table.UniqueConstraint("AK_songs_AlbumID", x => x.AlbumID);
                    table.UniqueConstraint("AK_songs_ArtistID", x => x.ArtistID);
                    table.UniqueConstraint("AK_songs_GenreID", x => x.GenreID);
                    table.ForeignKey(
                        name: "Song ID - Playlistsong SongID",
                        column: x => x.ID,
                        principalTable: "playlistsong",
                        principalColumn: "SongID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "albums",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci"),
                    Image = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci"),
                    Released = table.Column<DateTime>(type: "date", nullable: false),
                    ArtistID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_albums", x => x.ID);
                    table.UniqueConstraint("AK_albums_ArtistID", x => x.ArtistID);
                    table.ForeignKey(
                        name: "Album ID - Song AlbumID",
                        column: x => x.ID,
                        principalTable: "songs",
                        principalColumn: "AlbumID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "genres",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_genres", x => x.ID);
                    table.ForeignKey(
                        name: "Genre ID - Song GenreID",
                        column: x => x.ID,
                        principalTable: "songs",
                        principalColumn: "GenreID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "utf8_hungarian_ci"),
                    Name = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8_hungarian_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.ID);
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
                });

            migrationBuilder.CreateIndex(
                name: "IX_albums_ArtistID",
                table: "albums",
                column: "ArtistID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_playlists_UserID",
                table: "playlists",
                column: "UserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_playlistsong_PlaylistID",
                table: "playlistsong",
                column: "PlaylistID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_playlistsong_SongID",
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