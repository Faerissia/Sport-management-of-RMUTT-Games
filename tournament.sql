-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2023 at 07:42 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesis`
--

-- --------------------------------------------------------

--
-- Table structure for table `tournament`
--

CREATE TABLE `tournament` (
  `tnmID` int(3) NOT NULL,
  `tnmName` varchar(255) NOT NULL,
  `sportID` int(3) DEFAULT NULL,
  `tnmUrl` varchar(255) DEFAULT NULL,
  `Rstartdate` date DEFAULT NULL,
  `Renddate` date DEFAULT NULL,
  `tnmStartdate` date DEFAULT NULL,
  `tnmEnddate` date DEFAULT NULL,
  `tnmTypegame` enum('single','leaderboard','roundrobin','roundsingle') DEFAULT NULL,
  `tnmDetail` varchar(255) DEFAULT NULL,
  `tnmPicture` varchar(255) DEFAULT NULL,
  `tnmFile1` varchar(255) DEFAULT NULL,
  `tnmFile2` varchar(255) DEFAULT NULL,
  `tnmFile3` varchar(255) DEFAULT NULL,
  `accountID` int(3) DEFAULT NULL,
  `st1` varchar(255) DEFAULT NULL,
  `nd2` varchar(255) DEFAULT NULL,
  `rd3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`tnmID`, `tnmName`, `sportID`, `tnmUrl`, `Rstartdate`, `Renddate`, `tnmStartdate`, `tnmEnddate`, `tnmTypegame`, `tnmDetail`, `tnmPicture`, `tnmFile1`, `tnmFile2`, `tnmFile3`, `accountID`, `st1`, `nd2`, `rd3`) VALUES
(17, 'Leaderboard', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-02', '2023-02-03', '2023-02-02', '2023-02-03', NULL, 'Leaderboard', '1675309540114_tennis.jfif', '1675309540114_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Round Robin', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-02', '2023-02-03', '2023-02-02', '2023-02-03', NULL, 'Round Robin', '1675309857469_kl.jpg', '1675309857469_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`tnmID`),
  ADD KEY `sportID` (`sportID`),
  ADD KEY `accountID` (`accountID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`sportID`) REFERENCES `sport` (`sportID`),
  ADD CONSTRAINT `tournament_ibfk_2` FOREIGN KEY (`accountID`) REFERENCES `account` (`accountID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
