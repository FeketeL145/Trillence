-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 11. 11:38
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
CREATE DATABASE IF NOT EXISTS `trillence` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `trillence`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums`
--
-- Létrehozva: 2024. Már 01. 10:05
-- Utolsó frissítés: 2024. Már 11. 10:38
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL,
  `Released` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `albums`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-album`
--
-- Létrehozva: 2024. Már 11. 08:53
-- Utolsó frissítés: 2024. Már 11. 10:37
--

DROP TABLE IF EXISTS `artist-album`;
CREATE TABLE `artist-album` (
  `ID` bigint(20) NOT NULL,
  `ArtistID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `AlbumID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Létrehozva: 2024. Már 11. 08:53
-- Utolsó frissítés: 2024. Már 11. 10:38
--

DROP TABLE IF EXISTS `artist-song`;
CREATE TABLE `artist-song` (
  `ID` bigint(20) NOT NULL,
  `ArtistID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `SongID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Létrehozva: 2024. Már 01. 08:26
-- Utolsó frissítés: 2024. Már 11. 10:38
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `artists`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist-song`
--
-- Létrehozva: 2024. Már 11. 08:54
--

DROP TABLE IF EXISTS `playlist-song`;
CREATE TABLE `playlist-song` (
  `ID` bigint(20) NOT NULL,
  `SongID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `PlaylistID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Létrehozva: 2024. Már 01. 08:26
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `UserID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlists`:
--   `UserID`
--       `users` -> `ID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Már 01. 08:26
-- Utolsó frissítés: 2024. Már 11. 10:38
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL,
  `Length` time DEFAULT NULL,
  `AlbumID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Genre` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `songs`:
--   `AlbumID`
--       `albums` -> `ID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Már 01. 08:26
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `users`:
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
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AlbumID` (`AlbumID`),
  ADD KEY `ArtistID` (`ArtistID`);

--
-- A tábla indexei `artist-song`
--
ALTER TABLE `artist-song`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ArtistID1` (`ArtistID`),
  ADD KEY `SongID` (`SongID`);

--
-- A tábla indexei `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `playlist-song`
--
ALTER TABLE `playlist-song`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlaylistID` (`PlaylistID`),
  ADD KEY `SongID1` (`SongID`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Song AlbumID - Album ID` (`AlbumID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `artist-album`
--
ALTER TABLE `artist-album`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `artist-song`
--
ALTER TABLE `artist-song`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `playlist-song`
--
ALTER TABLE `playlist-song`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `artist-album`
--
ALTER TABLE `artist-album`
  ADD CONSTRAINT `artist-album_ibfk_1` FOREIGN KEY (`AlbumID`) REFERENCES `albums` (`ID`),
  ADD CONSTRAINT `artist-album_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ID`);

--
-- Megkötések a táblához `artist-song`
--
ALTER TABLE `artist-song`
  ADD CONSTRAINT `artist-song_ibfk_1` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ID`),
  ADD CONSTRAINT `artist-song_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `songs` (`ID`);

--
-- Megkötések a táblához `playlist-song`
--
ALTER TABLE `playlist-song`
  ADD CONSTRAINT `playlist-song_ibfk_1` FOREIGN KEY (`PlaylistID`) REFERENCES `playlists` (`ID`),
  ADD CONSTRAINT `playlist-song_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `songs` (`ID`);

--
-- Megkötések a táblához `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Song AlbumID - Album ID` FOREIGN KEY (`AlbumID`) REFERENCES `albums` (`ID`) ON DELETE CASCADE;


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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
