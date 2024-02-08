-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 08. 08:49
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
CREATE DATABASE IF NOT EXISTS `trillence` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `trillence`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums`
--
-- Létrehozva: 2024. Feb 08. 07:22
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Album ID.',
  `Name` tinytext NOT NULL COMMENT 'Album name.',
  `Image` tinytext NOT NULL,
  `Released` date NOT NULL COMMENT 'Album release date.',
  `Listens` bigint(20) NOT NULL COMMENT 'Times somebody has listened to any of the songs from the album.',
  `ArtistID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Artist ID.',
  `SongID` char(36) NOT NULL COMMENT 'Song ID.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `albums`:
--   `ID`
--       `songs` -> `AlbumID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artists`
--
-- Létrehozva: 2024. Feb 07. 09:40
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Artist ID.',
  `AlbumID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Album ID.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `artists`:
--   `ID`
--       `songs` -> `ArtistID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--
-- Létrehozva: 2024. Feb 07. 09:40
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Genre ID.',
  `Name` tinytext NOT NULL COMMENT 'Genre name.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `genres`:
--   `ID`
--       `songs` -> `GenreID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlistplay`
--
-- Létrehozva: 2024. Feb 08. 07:42
--

DROP TABLE IF EXISTS `playlistplay`;
CREATE TABLE `playlistplay` (
  `SongID` char(36) NOT NULL,
  `PlaylistID` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `playlistplay`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--
-- Létrehozva: 2024. Feb 08. 07:40
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `UserID` char(36) NOT NULL,
  `Name` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlists`:
--   `ID`
--       `playlistplay` -> `PlaylistID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Feb 08. 07:43
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) NOT NULL COMMENT 'Song ID.',
  `Name` tinytext NOT NULL COMMENT 'Song name.',
  `Length` time NOT NULL COMMENT 'Song length.',
  `Listens` bigint(20) NOT NULL COMMENT 'Times someone has listened to the song.',
  `Likes` bigint(20) NOT NULL COMMENT 'Song like amount.',
  `Dislikes` bigint(20) NOT NULL COMMENT 'Song dislike amount.',
  `ArtistID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Artist ID.',
  `AlbumID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Album ID.',
  `GenreID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'Genre ID.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `songs`:
--   `ID`
--       `albums` -> `SongID`
--   `ID`
--       `playlistplay` -> `SongID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Feb 07. 11:49
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'User ID.',
  `Name` tinytext NOT NULL COMMENT 'Username.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `users`:
--   `ID`
--       `artists` -> `ID`
--

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_albums_SongID` (`SongID`),
  ADD UNIQUE KEY `ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `SongID` (`SongID`);

--
-- A tábla indexei `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AlbumID` (`AlbumID`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `playlistplay`
--
ALTER TABLE `playlistplay`
  ADD UNIQUE KEY `SongID` (`SongID`),
  ADD UNIQUE KEY `PlaylistID` (`PlaylistID`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_songs_AlbumID` (`AlbumID`),
  ADD UNIQUE KEY `AK_songs_ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `AK_songs_GenreID` (`GenreID`),
  ADD UNIQUE KEY `AlbumID1` (`AlbumID`),
  ADD UNIQUE KEY `ArtistID1` (`ArtistID`),
  ADD UNIQUE KEY `GenreID` (`GenreID`);

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
  ADD CONSTRAINT `Album ID - Song AlbumID` FOREIGN KEY (`ID`) REFERENCES `songs` (`AlbumID`);

--
-- Megkötések a táblához `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `Artist ID - Song ArtistID` FOREIGN KEY (`ID`) REFERENCES `songs` (`ArtistID`);

--
-- Megkötések a táblához `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `Genre ID - Song GenreID` FOREIGN KEY (`ID`) REFERENCES `songs` (`GenreID`);

--
-- Megkötések a táblához `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `Playlist ID - Playlistplay PlaylistId` FOREIGN KEY (`ID`) REFERENCES `playlistplay` (`PlaylistID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Song ID - Album SongID` FOREIGN KEY (`ID`) REFERENCES `albums` (`SongID`),
  ADD CONSTRAINT `Song ID - Playlistplay SongID` FOREIGN KEY (`ID`) REFERENCES `playlistplay` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `User ID - Artist ID` FOREIGN KEY (`ID`) REFERENCES `artists` (`ID`);


--
-- Metaadat
--
USE `phpmyadmin`;

--
-- A(z) albums tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) artists tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) genres tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) playlistplay tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) playlists tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) songs tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) users tábla metaadatai
--
-- Hiba a(z) phpmyadmin.pma__column_info tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__column_info&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__table_uiprefs tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__table_uiprefs&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__tracking tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__tracking&#039; tabla nincs zarolva a LOCK TABLES-szel

--
-- A(z) trillence adatbázis metaadatai
--
-- Hiba a(z) phpmyadmin.pma__bookmark tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__bookmark&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__relation tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__relation&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__savedsearches tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__savedsearches&#039; tabla nincs zarolva a LOCK TABLES-szel
-- Hiba a(z) phpmyadmin.pma__central_columns tábla adatainak olvasásakor: #1100 - A(z) &#039;pma__central_columns&#039; tabla nincs zarolva a LOCK TABLES-szel
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
