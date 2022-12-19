-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2022 at 07:20 PM
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
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountID` int(3) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `level` enum('เจ้าหน้าที่','ผู้ดูแลระบบ') NOT NULL DEFAULT 'เจ้าหน้าที่' COMMENT 'ระดับสิทธิ์ 0 = แอดมิน,1 = เจ้าหน้าที่',
  `status` enum('ใช้งาน','ลาออก') NOT NULL DEFAULT 'ใช้งาน' COMMENT 'สถานะการทำงาน 0 = ลาออก ,1 = ใช้งาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accountID`, `email`, `password`, `name`, `lname`, `phone`, `level`, `status`) VALUES
(0, 'genxiuyin29@gmail.com', '1234567890', 'nun', 'rat', '0831140590', 'เจ้าหน้าที่', 'ใช้งาน'),
(4, 'firstlnw0099@gmail.com', 'f1478fd087', 'Nonthphat', 'Ruaklittichai', '0984926565', 'เจ้าหน้าที่', 'ใช้งาน');

-- --------------------------------------------------------

--
-- Table structure for table `detailmatch`
--

CREATE TABLE `detailmatch` (
  `dematchID` int(3) NOT NULL,
  `matchID` int(3) NOT NULL,
  `playerID` int(3) NOT NULL,
  `score` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `facultyID` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `uniID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`facultyID`, `name`, `uniID`) VALUES
(1, 'คณะวิทยาศาสตร์และเทคโนโลยี', 1),
(2, 'คณะวิศวกรรมศาสตร์', 1),
(3, 'คณะบริหาร', 1),
(4, 'คณะจิตรกรรม', 1),
(5, 'คณะคหกรรม', 1),
(6, 'คณะบัญชี', 1),
(7, 'คณะมัลติมีเดียร์', 2),
(8, 'คณะรัฐศาสตร์', 2),
(9, 'คณะนิเทศ', 2),
(10, 'คณะสถาปัต', 2);

-- --------------------------------------------------------

--
-- Table structure for table `highlight`
--

CREATE TABLE `highlight` (
  `highlightID` int(3) NOT NULL,
  `tnmID` int(3) NOT NULL,
  `filePic` varchar(255) DEFAULT NULL,
  `date` date DEFAULT curdate(),
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `matchID` int(3) NOT NULL,
  `tnmID` int(3) NOT NULL,
  `round` varchar(3) DEFAULT NULL,
  `dateMatch` date DEFAULT curdate(),
  `placeID` int(3) NOT NULL,
  `winner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `IDCard` varchar(13) NOT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `placeID` int(3) NOT NULL,
  `placeName` varchar(255) NOT NULL,
  `sportID` int(3) NOT NULL,
  `placeUrl` varchar(255) DEFAULT NULL,
  `placeFile` varchar(255) DEFAULT NULL,
  `placeDetail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`placeID`, `placeName`, `sportID`, `placeUrl`, `placeFile`, `placeDetail`) VALUES
(3, 'ทดสอบ', 1, '1', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `place_opening`
--

CREATE TABLE `place_opening` (
  `openingID` int(3) NOT NULL,
  `placeID` int(3) NOT NULL,
  `day` date DEFAULT curdate(),
  `timeOpen` time DEFAULT curtime(),
  `timeClose` time DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `playerID` int(3) NOT NULL,
  `playerIDCard` varchar(13) NOT NULL,
  `playerFName` varchar(50) NOT NULL,
  `playerLName` varchar(13) NOT NULL,
  `playerGender` enum('male','female') NOT NULL,
  `playerBirthday` date DEFAULT curdate(),
  `playerPhone` varchar(10) NOT NULL,
  `playerEmail` varchar(50) NOT NULL,
  `facultyID` int(3) NOT NULL,
  `teamID` int(3) NOT NULL,
  `playerFile1` varchar(255) DEFAULT NULL,
  `playerFile2` varchar(255) DEFAULT NULL,
  `playerFile3` varchar(255) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `detailDoc` varchar(255) DEFAULT NULL,
  `otp` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sport`
--

CREATE TABLE `sport` (
  `sportID` int(3) NOT NULL,
  `sportName` varchar(50) NOT NULL,
  `sportPlaynum` int(2) NOT NULL,
  `type` enum('เดี่ยว','คู่','ทีม') NOT NULL DEFAULT 'เดี่ยว'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sport`
--

INSERT INTO `sport` (`sportID`, `sportName`, `sportPlaynum`, `type`) VALUES
(1, 'ฟุตบอล', 11, 'เดี่ยว'),
(3, 'แบตมินตัน', 1, 'เดี่ยว'),
(4, 'บาสเก็ตบอล', 9, 'ทีม');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `teamID` int(3) NOT NULL,
  `NameAgent` varchar(50) NOT NULL,
  `LnameAgent` varchar(50) NOT NULL,
  `teamPhoneA` varchar(10) DEFAULT NULL,
  `teamEmailA` varchar(50) DEFAULT NULL,
  `teamStatus` enum('cancle','accept','waitedit','waitinspection') DEFAULT NULL,
  `teamPic` varchar(255) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `detailDoc` varchar(255) DEFAULT NULL,
  `otp` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `tnmTypegame` enum('single','double','leaderboard','roundrobin','roundsingle') DEFAULT NULL,
  `tnmDetail` varchar(255) DEFAULT NULL,
  `tnmPicture` varchar(255) DEFAULT NULL,
  `tnmFile1` varchar(255) DEFAULT NULL,
  `tnmFile2` varchar(255) DEFAULT NULL,
  `tnmFile3` varchar(255) DEFAULT NULL,
  `accountID` int(3) DEFAULT NULL,
  `st1` varchar(255) DEFAULT NULL,
  `nd2` varchar(255) DEFAULT NULL,
  `rd3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`tnmID`, `tnmName`, `sportID`, `tnmUrl`, `Rstartdate`, `Renddate`, `tnmStartdate`, `tnmEnddate`, `tnmTypegame`, `tnmDetail`, `tnmPicture`, `tnmFile1`, `tnmFile2`, `tnmFile3`, `accountID`, `st1`, `nd2`, `rd3`) VALUES
(13, 'test', 3, 'test', NULL, NULL, NULL, NULL, NULL, 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `uniID` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ไม่เข้าร่วม','เข้าร่วม') NOT NULL DEFAULT 'ไม่เข้าร่วม' COMMENT 'ระดับสิทธิ์ 0 = ไม่ได้เข้าร่วม,1 = เข้าร่วม'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`uniID`, `name`, `status`) VALUES
(1, 'มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี', 'ไม่เข้าร่วม'),
(2, 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา', 'ไม่เข้าร่วม'),
(3, 'มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน', 'ไม่เข้าร่วม'),
(4, 'มหาวิทยาลัยพระจอมเกล้าพระนครเหนือ', 'ไม่เข้าร่วม'),
(5, 'เทส', 'ไม่เข้าร่วม'),
(6, 'wwwww', 'ไม่เข้าร่วม');

-- --------------------------------------------------------

--
-- Table structure for table `useplace`
--

CREATE TABLE `useplace` (
  `useID` int(3) NOT NULL,
  `placeID` int(3) NOT NULL,
  `dateUse` date DEFAULT curdate(),
  `timeStart` time DEFAULT curtime(),
  `timeEnd` time DEFAULT curtime(),
  `tnmID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `detailmatch`
--
ALTER TABLE `detailmatch`
  ADD PRIMARY KEY (`dematchID`),
  ADD KEY `matchID` (`matchID`),
  ADD KEY `playerID` (`playerID`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`facultyID`),
  ADD KEY `uniID` (`uniID`);

--
-- Indexes for table `highlight`
--
ALTER TABLE `highlight`
  ADD PRIMARY KEY (`highlightID`),
  ADD KEY `tnmID` (`tnmID`);

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`matchID`),
  ADD KEY `tnmID` (`tnmID`),
  ADD KEY `placeID` (`placeID`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`IDCard`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`placeID`),
  ADD KEY `sportID` (`sportID`);

--
-- Indexes for table `place_opening`
--
ALTER TABLE `place_opening`
  ADD PRIMARY KEY (`openingID`),
  ADD KEY `placeID` (`placeID`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`playerID`),
  ADD KEY `facultyID` (`facultyID`),
  ADD KEY `teamID` (`teamID`),
  ADD KEY `tnmID` (`tnmID`);

--
-- Indexes for table `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`sportID`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`teamID`),
  ADD KEY `tnmID` (`tnmID`);

--
-- Indexes for table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`tnmID`),
  ADD KEY `sportID` (`sportID`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`uniID`);

--
-- Indexes for table `useplace`
--
ALTER TABLE `useplace`
  ADD PRIMARY KEY (`useID`),
  ADD KEY `placeID` (`placeID`),
  ADD KEY `tnmID` (`tnmID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accountID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `detailmatch`
--
ALTER TABLE `detailmatch`
  MODIFY `dematchID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `highlight`
--
ALTER TABLE `highlight`
  MODIFY `highlightID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `placeID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `place_opening`
--
ALTER TABLE `place_opening`
  MODIFY `openingID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sport`
--
ALTER TABLE `sport`
  MODIFY `sportID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `uniID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `useplace`
--
ALTER TABLE `useplace`
  MODIFY `useID` int(3) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailmatch`
--
ALTER TABLE `detailmatch`
  ADD CONSTRAINT `detailmatch_ibfk_1` FOREIGN KEY (`matchID`) REFERENCES `match` (`matchID`),
  ADD CONSTRAINT `detailmatch_ibfk_2` FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`);

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`uniID`) REFERENCES `university` (`uniID`);

--
-- Constraints for table `highlight`
--
ALTER TABLE `highlight`
  ADD CONSTRAINT `highlight_ibfk_1` FOREIGN KEY (`tnmID`) REFERENCES `tournament` (`tnmID`);

--
-- Constraints for table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `match_ibfk_1` FOREIGN KEY (`tnmID`) REFERENCES `tournament` (`tnmID`),
  ADD CONSTRAINT `match_ibfk_2` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`);

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `place_ibfk_1` FOREIGN KEY (`sportID`) REFERENCES `sport` (`sportID`);

--
-- Constraints for table `place_opening`
--
ALTER TABLE `place_opening`
  ADD CONSTRAINT `place_opening_ibfk_1` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`);

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`),
  ADD CONSTRAINT `player_ibfk_2` FOREIGN KEY (`teamID`) REFERENCES `team` (`teamID`),
  ADD CONSTRAINT `player_ibfk_3` FOREIGN KEY (`tnmID`) REFERENCES `tournament` (`tnmID`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`tnmID`) REFERENCES `tournament` (`tnmID`);

--
-- Constraints for table `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`sportID`) REFERENCES `sport` (`sportID`),
  ADD CONSTRAINT `tournament_ibfk_2` FOREIGN KEY (`accountID`) REFERENCES `account` (`accountID`);

--
-- Constraints for table `useplace`
--
ALTER TABLE `useplace`
  ADD CONSTRAINT `useplace_ibfk_1` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`),
  ADD CONSTRAINT `useplace_ibfk_2` FOREIGN KEY (`tnmID`) REFERENCES `tournament` (`tnmID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
