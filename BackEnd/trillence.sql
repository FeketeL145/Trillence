-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 14. 13:26
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
-- Létrehozva: 2024. Feb 14. 08:08
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Image` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Released` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `albums`:
--   `ID`
--       `songs` -> `AlbumID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-album`
--
-- Létrehozva: 2024. Feb 14. 08:26
--

DROP TABLE IF EXISTS `artist-album`;
CREATE TABLE `artist-album` (
  `ArtistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `AlbumID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `artist-album`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-song`
--
-- Létrehozva: 2024. Feb 14. 08:26
--

DROP TABLE IF EXISTS `artist-song`;
CREATE TABLE `artist-song` (
  `ArtistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `SongID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `artist-song`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artists`
--
-- Létrehozva: 2024. Feb 14. 08:24
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `artists`:
--   `ID`
--       `artist-album` -> `AlbumID`
--   `ID`
--       `artist-song` -> `SongID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--
-- Létrehozva: 2024. Feb 14. 07:11
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `genres`:
--   `ID`
--       `songs` -> `GenreID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist-song`
--
-- Létrehozva: 2024. Feb 14. 08:26
--

DROP TABLE IF EXISTS `playlist-song`;
CREATE TABLE `playlist-song` (
  `PlaylistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `SongID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlist-song`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--
-- Létrehozva: 2024. Feb 14. 08:29
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `UserID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlists`:
--   `ID`
--       `playlist-song` -> `PlaylistID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Feb 14. 08:29
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Length` time DEFAULT NULL,
  `AlbumID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `GenreID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `songs`:
--   `ID`
--       `artist-song` -> `SongID`
--   `ID`
--       `playlist-song` -> `SongID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Feb 14. 07:13
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `users`:
--   `ID`
--       `playlists` -> `UserID`
--

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `artist-album`
--
ALTER TABLE `artist-album`
  ADD PRIMARY KEY (`ArtistID`,`AlbumID`),
  ADD UNIQUE KEY `ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `AlbumID` (`AlbumID`);

--
-- A tábla indexei `artist-song`
--
ALTER TABLE `artist-song`
  ADD PRIMARY KEY (`ArtistID`,`SongID`),
  ADD UNIQUE KEY `ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `SongID` (`SongID`);

--
-- A tábla indexei `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `playlist-song`
--
ALTER TABLE `playlist-song`
  ADD PRIMARY KEY (`PlaylistID`,`SongID`),
  ADD UNIQUE KEY `PlaylistID` (`PlaylistID`),
  ADD UNIQUE KEY `SongID` (`SongID`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_playlists_UserID` (`UserID`),
  ADD UNIQUE KEY `IX_playlists_UserID` (`UserID`);

--
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_songs_Album1ID` (`AlbumID`),
  ADD UNIQUE KEY `AK_songs_Genre1ID` (`GenreID`),
  ADD UNIQUE KEY `AK_songs_AlbumID` (`AlbumID`),
  ADD UNIQUE KEY `AK_songs_GenreID` (`GenreID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`) USING HASH;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `Album ID - Song AlbumID` FOREIGN KEY (`ID`) REFERENCES `songs` (`AlbumID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `Artist ID - Artist-Album AristID` FOREIGN KEY (`ID`) REFERENCES `artist-album` (`AlbumID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Artist ID - Artist-Song ArtistID` FOREIGN KEY (`ID`) REFERENCES `artist-song` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `Genre ID - Song GenreID` FOREIGN KEY (`ID`) REFERENCES `songs` (`GenreID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `Playlist ID - Playlist-Song PlaylistID` FOREIGN KEY (`ID`) REFERENCES `playlist-song` (`PlaylistID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Song ID - Artist-Song SongID` FOREIGN KEY (`ID`) REFERENCES `artist-song` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Song ID - Playlist-Song SongID` FOREIGN KEY (`ID`) REFERENCES `playlist-song` (`SongID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `User ID - Playlist UserID` FOREIGN KEY (`ID`) REFERENCES `playlists` (`UserID`) ON DELETE CASCADE;


--
-- Metaadat
--
USE `phpmyadmin`;

--
-- A(z) albums tábla metaadatai
--

--
-- A(z) artist-album tábla metaadatai
--

--
-- A(z) artist-song tábla metaadatai
--

--
-- A(z) artists tábla metaadatai
--

--
-- A(z) genres tábla metaadatai
--

--
-- A(z) playlist-song tábla metaadatai
--

--
-- A(z) playlists tábla metaadatai
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
