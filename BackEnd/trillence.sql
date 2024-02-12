-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 12. 10:01
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `trillence`
--
CREATE DATABASE IF NOT EXISTS `trillence` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `trillence`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums`
--
-- Létrehozva: 2024. Feb 12. 09:00
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Image` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Released` date NOT NULL,
  `ArtistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--
-- Létrehozva: 2024. Feb 12. 09:00
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--
-- Létrehozva: 2024. Feb 12. 09:00
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `UserID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlistsong`
--
-- Létrehozva: 2024. Feb 12. 09:00
--

DROP TABLE IF EXISTS `playlistsong`;
CREATE TABLE `playlistsong` (
  `SongID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `PlaylistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Feb 12. 09:00
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Length` time NOT NULL,
  `ArtistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `AlbumID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `GenreID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Feb 12. 09:00
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_albums_ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `IX_albums_ArtistID` (`ArtistID`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_playlists_UserID` (`UserID`),
  ADD UNIQUE KEY `IX_playlists_UserID` (`UserID`);

--
-- A tábla indexei `playlistsong`
--
ALTER TABLE `playlistsong`
  ADD PRIMARY KEY (`SongID`,`PlaylistID`),
  ADD UNIQUE KEY `AK_playlistsong_PlaylistID` (`PlaylistID`),
  ADD UNIQUE KEY `AK_playlistsong_SongID` (`SongID`),
  ADD UNIQUE KEY `IX_playlistsong_PlaylistID` (`PlaylistID`),
  ADD UNIQUE KEY `IX_playlistsong_SongID` (`SongID`);

--
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_songs_AlbumID` (`AlbumID`),
  ADD UNIQUE KEY `AK_songs_ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `AK_songs_GenreID` (`GenreID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `Album ID - Song AlbumID` FOREIGN KEY (`ID`) REFERENCES `songs` (`AlbumID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `Genre ID - Song GenreID` FOREIGN KEY (`ID`) REFERENCES `songs` (`GenreID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `Playlist ID - Playlistsong PlaylistID` FOREIGN KEY (`ID`) REFERENCES `playlistsong` (`PlaylistID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Song ID - Playlistsong SongID` FOREIGN KEY (`ID`) REFERENCES `playlistsong` (`SongID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `User ID - Album ArtistID` FOREIGN KEY (`ID`) REFERENCES `albums` (`ArtistID`) ON DELETE CASCADE,
  ADD CONSTRAINT `User ID - Playlist UserID` FOREIGN KEY (`ID`) REFERENCES `playlists` (`UserID`) ON DELETE CASCADE,
  ADD CONSTRAINT `User ID - Song ArtistID` FOREIGN KEY (`ID`) REFERENCES `songs` (`ArtistID`) ON DELETE CASCADE;


--
-- Metaadat
--
USE `phpmyadmin`;

--
-- A(z) albums tábla metaadatai
--

--
-- A(z) genres tábla metaadatai
--

--
-- A(z) playlists tábla metaadatai
--

--
-- A(z) playlistsong tábla metaadatai
--

--
-- A(z) songs tábla metaadatai
--

--
-- A(z) users tábla metaadatai
--

--
-- A(z) trillence adatbázis metaadatai
--

--
-- A tábla adatainak kiíratása `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_descr`) VALUES
('trillence', 'da');

SET @LAST_PAGE = LAST_INSERT_ID();

--
-- A tábla adatainak kiíratása `pma__table_coords`
--

INSERT INTO `pma__table_coords` (`db_name`, `table_name`, `pdf_page_number`, `x`, `y`) VALUES
('trillence', 'albums', @LAST_PAGE, 496, 310),
('trillence', 'artists', @LAST_PAGE, 242, 218),
('trillence', 'genres', @LAST_PAGE, 502, 142),
('trillence', 'songs', @LAST_PAGE, 800, 163),
('trillence', 'users', @LAST_PAGE, 39, 204);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
