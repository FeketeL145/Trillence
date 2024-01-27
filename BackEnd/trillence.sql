-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 27. 21:21
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
-- Létrehozva: 2024. Jan 27. 20:20
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) NOT NULL COMMENT 'Album ID.',
  `Name` tinytext NOT NULL COMMENT 'Album name.',
  `Released` date NOT NULL COMMENT 'Album release date.',
  `Listens` bigint(20) NOT NULL COMMENT 'Times somebody has listened to any of the songs from the album.',
  `ArtistID` char(36) NOT NULL COMMENT 'Artist ID.',
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
-- Létrehozva: 2024. Jan 27. 20:20
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `ID` char(36) NOT NULL COMMENT 'Artist ID.',
  `AlbumID` char(36) NOT NULL COMMENT 'Album ID.'
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
-- Létrehozva: 2024. Jan 27. 20:20
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `ID` char(36) NOT NULL COMMENT 'Genre ID.',
  `Name` tinytext NOT NULL COMMENT 'Genre name.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `genres`:
--   `ID`
--       `songs` -> `GenreID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--
-- Létrehozva: 2024. Jan 27. 20:20
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `ID` char(36) NOT NULL COMMENT 'Song ID.',
  `Name` tinytext NOT NULL COMMENT 'Song name.',
  `Length` time NOT NULL COMMENT 'Song length.',
  `Listens` bigint(20) NOT NULL COMMENT 'Times someone has listened to the song.',
  `Likes` bigint(20) NOT NULL COMMENT 'Song like amount.',
  `Dislikes` bigint(20) NOT NULL COMMENT 'Song dislike amount.',
  `ArtistID` char(36) NOT NULL COMMENT 'Artist ID.',
  `AlbumID` char(36) NOT NULL COMMENT 'Album ID.',
  `GenreID` char(36) NOT NULL COMMENT 'Genre ID.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `songs`:
--   `ID`
--       `albums` -> `SongID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--
-- Létrehozva: 2024. Jan 27. 20:20
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) NOT NULL COMMENT 'User ID.',
  `Name` tinytext NOT NULL COMMENT 'Username.',
  `Password` tinytext NOT NULL COMMENT 'User password.',
  `Birth` date NOT NULL COMMENT 'User birthdate.'
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
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ArtistID` (`ArtistID`),
  ADD UNIQUE KEY `AlbumID` (`AlbumID`),
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
  ADD CONSTRAINT `Album ID - Song AlbumID` FOREIGN KEY (`ID`) REFERENCES `songs` (`AlbumID`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `Artist ID - Song ArtistID` FOREIGN KEY (`ID`) REFERENCES `songs` (`ArtistID`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `Genre ID - Song GenreID` FOREIGN KEY (`ID`) REFERENCES `songs` (`GenreID`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Song ID - Album SongID` FOREIGN KEY (`ID`) REFERENCES `albums` (`SongID`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `User ID - Artist ID` FOREIGN KEY (`ID`) REFERENCES `artists` (`ID`) ON UPDATE CASCADE;


--
-- Metaadat
--
USE `phpmyadmin`;

--
-- A(z) albums tábla metaadatai
--

--
-- A(z) artists tábla metaadatai
--

--
-- A(z) genres tábla metaadatai
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
