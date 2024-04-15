-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 15. 10:40
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET FOREIGN_KEY_CHECKS=0;
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

DELIMITER $$
--
-- Eljárások
--
DROP PROCEDURE IF EXISTS `DeleteOldVerifications`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteOldVerifications` ()   BEGIN
    DELETE FROM verification WHERE created_at < NOW() - INTERVAL 2 MINUTE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums`
--
-- Létrehozva: 2024. Már 25. 09:08
-- Utolsó frissítés: 2024. Ápr 11. 10:50
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL,
  `Released` int(10) UNSIGNED DEFAULT NULL,
  `ArtistID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `albums`:
--   `ArtistID`
--       `artists` -> `ID`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artist-song`
--
-- Létrehozva: 2024. Már 25. 09:08
-- Utolsó frissítés: 2024. Ápr 11. 10:50
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
-- Létrehozva: 2024. Már 25. 09:08
-- Utolsó frissítés: 2024. Ápr 11. 10:50
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
-- Létrehozva: 2024. Már 25. 09:08
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
-- Létrehozva: 2024. Már 25. 09:08
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
-- Létrehozva: 2024. Már 25. 09:08
-- Utolsó frissítés: 2024. Ápr 11. 10:50
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
-- Létrehozva: 2024. Már 25. 09:08
-- Utolsó frissítés: 2024. Ápr 15. 08:35
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Name` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `users`:
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `verification`
--
-- Létrehozva: 2024. Ápr 12. 07:59
-- Utolsó frissítés: 2024. Ápr 15. 08:36
--

DROP TABLE IF EXISTS `verification`;
CREATE TABLE `verification` (
  `Id` int(11) NOT NULL,
  `code` varchar(6) NOT NULL,
  `email` varchar(320) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- TÁBLA KAPCSOLATAI `verification`:
--

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Album ArtistID - Artist ID` (`ArtistID`);

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
-- A tábla indexei `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `artist-song`
--
ALTER TABLE `artist-song`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `playlist-song`
--
ALTER TABLE `playlist-song`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `verification`
--
ALTER TABLE `verification`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `Album ArtistID - Artist ID` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- A tábla adatainak kiíratása `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'trillence', 'songs', '{\"sorted_col\":\"`Length` DESC\"}', '2024-04-03 11:01:39');

--
-- A(z) users tábla metaadatai
--

--
-- A(z) verification tábla metaadatai
--

--
-- A(z) trillence adatbázis metaadatai
--

DELIMITER $$
--
-- Események
--
DROP EVENT IF EXISTS `DeleteOldVerificationsEvent`$$
CREATE DEFINER=`root`@`localhost` EVENT `DeleteOldVerificationsEvent` ON SCHEDULE EVERY 1 SECOND STARTS '2024-04-12 10:22:00' ON COMPLETION NOT PRESERVE ENABLE DO CALL DeleteOldVerifications()$$

DELIMITER ;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
