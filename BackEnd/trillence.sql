-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 26. 10:12
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
-- Létrehozva: 2024. Feb 22. 09:26
-- Utolsó frissítés: 2024. Feb 26. 08:16
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) NOT NULL,
  `Name` tinytext DEFAULT NULL,
  `Image` tinytext DEFAULT NULL,
  `Released` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `albums`:
--

--
-- A tábla adatainak kiíratása `albums`
--

INSERT INTO `albums` (`ID`, `Name`, `Image`, `Released`) VALUES
('0e8e0ed8-8cd0-4d82-a922-0bd9116fcf92', 'Album2', 'Image2.jpg', '2024-02-25'),
('78d964dd-8b65-44a5-95c2-3ea7afd999f6', 'Album1', 'Image1.jpg', '2024-02-24'),
('908d0455-e06d-479c-9bae-24119e3b3aa1', 'Album3', 'Image3.jpg', '2024-02-26');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-album`
--
-- Létrehozva: 2024. Feb 26. 08:47
-- Utolsó frissítés: 2024. Feb 26. 09:09
--

DROP TABLE IF EXISTS `artist-album`;
CREATE TABLE `artist-album` (
  `ArtistID` char(36) NOT NULL,
  `AlbumID` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `artist-album`:
--   `AlbumID`
--       `albums` -> `ID`
--   `ArtistID`
--       `artists` -> `ID`
--

--
-- A tábla adatainak kiíratása `artist-album`
--

INSERT INTO `artist-album` (`ArtistID`, `AlbumID`) VALUES
('bfc37676-538c-4c7f-8dfc-79454515c906', '0e8e0ed8-8cd0-4d82-a922-0bd9116fcf92'),
('4a4b4c4d-4a4b-4c4d-4a4b-4c4d4e4f4a4b', '1a1b1c1d-1a1b-1c1d-1a1b-1c1d1e1f1a1b'),
('5a5b5c5d-5a5b-5c5d-5a5b-5c5d5e5f5a5b', '2a2b2c2d-2a2b-2c2d-2a2b-2c2d2e2f2a2b'),
('6a6b6c6d-6a6b-6c6d-6a6b-6c6d6e6f6a6b', '3a3b3c3d-3a3b-3c3d-3a3b-3c3d3e3f3a3b'),
('eb419eec-11b1-4332-8082-a8559025b1f8', '908d0455-e06d-479c-9bae-24119e3b3aa1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-song`
--
-- Létrehozva: 2024. Feb 26. 08:47
--

DROP TABLE IF EXISTS `artist-song`;
CREATE TABLE `artist-song` (
  `ArtistID` char(36) NOT NULL,
  `SongID` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `artist-song`:
--   `ArtistID`
--       `artists` -> `ID`
--   `SongID`
--       `songs` -> `ID`
--

--
-- A tábla adatainak kiíratása `artist-song`
--

INSERT INTO `artist-song` (`ArtistID`, `SongID`) VALUES
('4a4b4c4d-4a4b-4c4d-4a4b-4c4d4e4f4a4b', '7a7b7c7d-7a7b-7c7d-7a7b-7c7d7e7f7a7b'),
('5a5b5c5d-5a5b-5c5d-5a5b-5c5d5e5f5a5b', '8a8b8c8d-8a8b-8c8d-8a8b-8c8d8e8f8a8b'),
('6a6b6c6d-6a6b-6c6d-6a6b-6c6d6e6f6a6b', '9a9b9c9d-9a9b-9c9d-9a9b-9c9d9e9f9a9b');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artists`
--
-- Létrehozva: 2024. Feb 22. 09:26
-- Utolsó frissítés: 2024. Feb 26. 08:11
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `ID` char(36) NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `artists`:
--

--
-- A tábla adatainak kiíratása `artists`
--

INSERT INTO `artists` (`ID`, `Name`) VALUES
('bfc37676-538c-4c7f-8dfc-79454515c906', 'Artist2'),
('cc7c42b2-fab5-478f-9348-8fe2194f0929', 'Artist1'),
('eb419eec-11b1-4332-8082-a8559025b1f8', 'Artist3');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist-song`
--
-- Létrehozva: 2024. Feb 26. 08:47
-- Utolsó frissítés: 2024. Feb 26. 09:11
--

DROP TABLE IF EXISTS `playlist-song`;
CREATE TABLE `playlist-song` (
  `PlaylistID` char(36) NOT NULL,
  `SongID` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlist-song`:
--   `PlaylistID`
--       `playlists` -> `ID`
--   `SongID`
--       `songs` -> `ID`
--

--
-- A tábla adatainak kiíratása `playlist-song`
--

INSERT INTO `playlist-song` (`PlaylistID`, `SongID`) VALUES
('16d3df6a-84f8-4717-8bef-2b4bfc74ea96', '00f5e4d7-cdf2-4bd9-b659-7e127701ce06');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--
-- Létrehozva: 2024. Feb 22. 09:26
-- Utolsó frissítés: 2024. Feb 26. 08:29
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `ID` char(36) NOT NULL,
  `UserID` char(36) NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `playlists`:
--   `UserID`
--       `users` -> `ID`
--

--
-- A tábla adatainak kiíratása `playlists`
--

INSERT INTO `playlists` (`ID`, `UserID`, `Name`) VALUES
('16d3df6a-84f8-4717-8bef-2b4bfc74ea96', '628adea9-b33f-4493-a203-8985e25036c8', 'Playlist3'),
('a3bbf530-5480-4c51-a2df-21ce3fb3c6c6', 'de96a518-b1af-4db7-b0df-0c838bf1839f', 'Playlist2'),
('bd1903e5-c12d-4e34-932d-ac2fa9efa84a', 'cd30867a-68f8-43e3-a216-abd4e185fb8b', 'Playlist1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Feb 22. 09:26
-- Utolsó frissítés: 2024. Feb 26. 08:35
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) NOT NULL,
  `Name` tinytext DEFAULT NULL,
  `Length` time DEFAULT NULL,
  `AlbumID` char(36) NOT NULL,
  `Genre` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `songs`:
--

--
-- A tábla adatainak kiíratása `songs`
--

INSERT INTO `songs` (`ID`, `Name`, `Length`, `AlbumID`, `Genre`) VALUES
('00f5e4d7-cdf2-4bd9-b659-7e127701ce06', 'Song2', '00:04:45', '78d964dd-8b65-44a5-95c2-3ea7afd999f6', 'Pop'),
('1afd29bc-764f-416f-86f8-0e910641137a', 'Song1', '00:14:22', '0e8e0ed8-8cd0-4d82-a922-0bd9116fcf92', 'Pop'),
('a0a440e5-f90a-4ae5-99cb-3bee114dbd5f', 'Song3', '00:09:04', '908d0455-e06d-479c-9bae-24119e3b3aa1', 'Jazz');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Feb 22. 09:26
-- Utolsó frissítés: 2024. Feb 26. 08:15
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `users`:
--

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `Name`) VALUES
('628adea9-b33f-4493-a203-8985e25036c8', 'TestUser2'),
('cd30867a-68f8-43e3-a216-abd4e185fb8b', 'TestUser3'),
('de96a518-b1af-4db7-b0df-0c838bf1839f', 'TestUser1');

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
  ADD PRIMARY KEY (`ArtistID`),
  ADD KEY `AlbumID` (`AlbumID`),
  ADD KEY `ArtistID` (`ArtistID`);

--
-- A tábla indexei `artist-song`
--
ALTER TABLE `artist-song`
  ADD PRIMARY KEY (`ArtistID`),
  ADD KEY `ArtistID` (`ArtistID`),
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
  ADD PRIMARY KEY (`SongID`),
  ADD KEY `PlaylistID` (`PlaylistID`),
  ADD KEY `SongID` (`SongID`);

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
  ADD PRIMARY KEY (`ID`);

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
