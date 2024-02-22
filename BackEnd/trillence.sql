-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 22. 10:16
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
-- Létrehozva: 2024. Feb 22. 09:04
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('1a1b1c1d-1a1b-1c1d-1a1b-1c1d1e1f1a1b', 'Album One', 'image1.jpg', '2023-01-01'),
('2a2b2c2d-2a2b-2c2d-2a2b-2c2d2e2f2a2b', 'Album Two', 'image2.jpg', '2023-05-15'),
('3a3b3c3d-3a3b-3c3d-3a3b-3c3d3e3f3a3b', 'Album Three', 'image3.jpg', '2024-02-22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-album`
--
-- Létrehozva: 2024. Feb 22. 09:04
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('4a4b4c4d-4a4b-4c4d-4a4b-4c4d4e4f4a4b', '1a1b1c1d-1a1b-1c1d-1a1b-1c1d1e1f1a1b'),
('5a5b5c5d-5a5b-5c5d-5a5b-5c5d5e5f5a5b', '2a2b2c2d-2a2b-2c2d-2a2b-2c2d2e2f2a2b'),
('6a6b6c6d-6a6b-6c6d-6a6b-6c6d6e6f6a6b', '3a3b3c3d-3a3b-3c3d-3a3b-3c3d3e3f3a3b');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-song`
--
-- Létrehozva: 2024. Feb 22. 09:04
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
-- Létrehozva: 2024. Feb 22. 09:04
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('4a4b4c4d-4a4b-4c4d-4a4b-4c4d4e4f4a4b', 'Artist One'),
('5a5b5c5d-5a5b-5c5d-5a5b-5c5d5e5f5a5b', 'Artist Two'),
('6a6b6c6d-6a6b-6c6d-6a6b-6c6d6e6f6a6b', 'Artist Three');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist-song`
--
-- Létrehozva: 2024. Feb 22. 09:04
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('12a12b12c12d-12a12b-12c12d-12a12b-12', '7a7b7c7d-7a7b-7c7d-7a7b-7c7d7e7f7a7b'),
('12a12b12c12d-12a12b-12c12d-12a12b-12', '8a8b8c8d-8a8b-8c8d-8a8b-8c8d8e8f8a8b'),
('13a13b13c13d-13a13b-13c13d-13a13b-13', '9a9b9c9d-9a9b-9c9d-9a9b-9c9d9e9f9a9b');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--
-- Létrehozva: 2024. Feb 22. 09:05
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('12a12b12c12d-12a12b-12c12d-12a12b-12', '10a10b10c10d-10a10b-10c10d-10a10b-10', 'Playlist One'),
('13a13b13c13d-13a13b-13c13d-13a13b-13', '11a11b11c11d-11a11b-11c11d-11a11b-11', 'Playlist Two');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Feb 22. 09:04
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('7a7b7c7d-7a7b-7c7d-7a7b-7c7d7e7f7a7b', 'Song One', '00:03:45', '1a1b1c1d-1a1b-1c1d-1a1b-1c1d1e1f1a1b', 'Pop'),
('8a8b8c8d-8a8b-8c8d-8a8b-8c8d8e8f8a8b', 'Song Two', '00:04:20', '2a2b2c2d-2a2b-2c2d-2a2b-2c2d2e2f2a2b', 'Rock'),
('9a9b9c9d-9a9b-9c9d-9a9b-9c9d9e9f9a9b', 'Song Three', '00:03:15', '3a3b3c3d-3a3b-3c3d-3a3b-3c3d3e3f3a3b', 'Jazz');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Feb 22. 09:05
-- Utolsó frissítés: 2024. Feb 22. 09:14
--

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
('10a10b10c10d-10a10b-10c10d-10a10b-10', 'User One'),
('11a11b11c11d-11a11b-11c11d-11a11b-11', 'User Two');

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
  ADD KEY `AlbumID` (`AlbumID`),
  ADD KEY `ArtistID` (`ArtistID`);

--
-- A tábla indexei `artist-song`
--
ALTER TABLE `artist-song`
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
