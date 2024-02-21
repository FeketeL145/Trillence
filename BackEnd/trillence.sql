-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 20. 13:09
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
-- Létrehozva: 2024. Feb 20. 10:25
-- Utolsó frissítés: 2024. Feb 20. 11:19
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
--

--
-- A tábla adatainak kiíratása `albums`
--

INSERT INTO `albums` (`ID`, `Name`, `Image`, `Released`) VALUES
('35ec445d-4c1e-4a33-9bc3-c74a8eaaef74', 'TestAlbum1', 'Image1.jpg', '2024-02-20'),
('68568dba-3a0b-4344-bffb-75e22d5b8c57', 'TestAlbum2', 'Image2.jpg', '2024-02-21'),
('d52b56de-f92b-4c48-8f17-9742c9ba7014', 'TestAlbum3', 'Image3.jpg', '2024-02-22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-album`
--
-- Létrehozva: 2024. Feb 20. 09:50
--

DROP TABLE IF EXISTS `artist-album`;
CREATE TABLE `artist-album` (
  `ArtistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `AlbumID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `artist-album`:
--   `AlbumID`
--       `albums` -> `ID`
--   `ArtistID`
--       `artists` -> `ID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-song`
--
-- Létrehozva: 2024. Feb 20. 09:50
--

DROP TABLE IF EXISTS `artist-song`;
CREATE TABLE `artist-song` (
  `ArtistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `SongID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `artist-song`:
--   `ArtistID`
--       `artists` -> `ID`
--   `SongID`
--       `songs` -> `ID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artists`
--
-- Létrehozva: 2024. Feb 20. 10:25
-- Utolsó frissítés: 2024. Feb 20. 11:20
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `artists`:
--

--
-- A tábla adatainak kiíratása `artists`
--

INSERT INTO `artists` (`ID`, `Name`) VALUES
('09489f65-0ccd-4511-a113-8a9e47cd4f15', 'Artist3'),
('a496f672-0613-4e08-af80-809110e53d66', 'Artist1'),
('b1b32209-9c8f-4a4f-8667-beef6c5d0328', 'Artist2');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--
-- Létrehozva: 2024. Feb 20. 09:50
-- Utolsó frissítés: 2024. Feb 20. 11:20
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `genres`:
--

--
-- A tábla adatainak kiíratása `genres`
--

INSERT INTO `genres` (`ID`, `Name`) VALUES
('8e38a9d1-d241-4959-9382-20e8c44a7b4e', 'Classical'),
('921bd92a-6c0e-46ca-983b-44e454e59d19', 'Pop'),
('bf26d5e9-9423-45cf-b871-310dfc3ff660', 'Rock'),
('e7d45e9c-497d-4c5e-8818-22ce8884ccc2', 'Jazz');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist-song`
--
-- Létrehozva: 2024. Feb 20. 09:50
--

DROP TABLE IF EXISTS `playlist-song`;
CREATE TABLE `playlist-song` (
  `PlaylistID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `SongID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlist-song`:
--   `PlaylistID`
--       `playlists` -> `ID`
--   `SongID`
--       `songs` -> `ID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--
-- Létrehozva: 2024. Feb 20. 10:26
-- Utolsó frissítés: 2024. Feb 20. 12:01
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `UserID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlists`:
--   `UserID`
--       `users` -> `ID`
--

--
-- A tábla adatainak kiíratása `playlists`
--

INSERT INTO `playlists` (`ID`, `UserID`, `Name`) VALUES
('c429faff-ba6a-44ec-abee-89e2751fb0fe', '9bce6382-47f0-4da7-be51-ed977aa100ba', 'string');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Feb 20. 10:26
-- Utolsó frissítés: 2024. Feb 20. 11:58
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Length` time DEFAULT NULL,
  `AlbumID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `GenreID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `songs`:
--   `AlbumID`
--       `albums` -> `ID`
--   `GenreID`
--       `genres` -> `ID`
--

--
-- A tábla adatainak kiíratása `songs`
--

INSERT INTO `songs` (`ID`, `Name`, `Length`, `AlbumID`, `GenreID`) VALUES
('41cbffaf-a9dc-4c8a-9e18-2a76e4d17219', 'first', '00:14:23', '35ec445d-4c1e-4a33-9bc3-c74a8eaaef74', '921bd92a-6c0e-46ca-983b-44e454e59d19'),
('540f9c76-4739-4761-8e4a-3304a8f27650', 'first2', '00:14:23', 'd52b56de-f92b-4c48-8f17-9742c9ba7014', 'e7d45e9c-497d-4c5e-8818-22ce8884ccc2');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Feb 20. 09:50
-- Utolsó frissítés: 2024. Feb 20. 11:21
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Name` tinytext CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- TÁBLA KAPCSOLATAI `users`:
--

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `Name`) VALUES
('9bce6382-47f0-4da7-be51-ed977aa100ba', 'User2'),
('d6044ac0-b467-494e-b120-e7ea2c304343', 'User1'),
('f9557df1-7849-4884-a87d-8b3a1b026227', 'User3');

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
  ADD UNIQUE KEY `AlbumID` (`AlbumID`);

--
-- A tábla indexei `artist-song`
--
ALTER TABLE `artist-song`
  ADD PRIMARY KEY (`ArtistID`,`SongID`),
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
  ADD UNIQUE KEY `SongID1` (`SongID`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_playlists_UserID` (`UserID`);

--
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AK_songs_AlbumID` (`AlbumID`),
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
-- Megkötések a táblához `artist-album`
--
ALTER TABLE `artist-album`
  ADD CONSTRAINT `FK_ArtistAlbum_Album` FOREIGN KEY (`AlbumID`) REFERENCES `albums` (`ID`),
  ADD CONSTRAINT `FK_ArtistAlbum_Artist` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ID`);

--
-- Megkötések a táblához `artist-song`
--
ALTER TABLE `artist-song`
  ADD CONSTRAINT `FK_ArtistSong_Artist` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ID`),
  ADD CONSTRAINT `FK_ArtistSong_Song` FOREIGN KEY (`SongID`) REFERENCES `songs` (`ID`);

--
-- Megkötések a táblához `playlist-song`
--
ALTER TABLE `playlist-song`
  ADD CONSTRAINT `FK_PlaylistSong_Playlist` FOREIGN KEY (`PlaylistID`) REFERENCES `playlists` (`ID`),
  ADD CONSTRAINT `FK_PlaylistSong_Song` FOREIGN KEY (`SongID`) REFERENCES `songs` (`ID`);

--
-- Megkötések a táblához `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `FK_Playlist_User` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `FK_Song_Album` FOREIGN KEY (`AlbumID`) REFERENCES `albums` (`ID`),
  ADD CONSTRAINT `FK_Song_Genre` FOREIGN KEY (`GenreID`) REFERENCES `genres` (`ID`);


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
