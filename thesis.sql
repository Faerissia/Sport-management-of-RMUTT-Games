-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2023 at 06:42 AM
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
  `status` enum('ใช้งาน','ปิดการใช้งาน') NOT NULL DEFAULT 'ใช้งาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accountID`, `email`, `password`, `name`, `lname`, `phone`, `level`, `status`) VALUES
(0, 'genxiuyin29@gmail.com', '1234567890', 'nun', 'rat', '0831140590', 'ผู้ดูแลระบบ', 'ใช้งาน'),
(1, 'admin', 'admin', 'admin', 'admin', '0984926565', 'ผู้ดูแลระบบ', 'ใช้งาน'),
(2, 'staff', 'staff', 'staff', 'staff', 'staff', 'เจ้าหน้าที่', 'ใช้งาน'),
(9, 'firstlnw0099@gmail.com', 'f1478fd087', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', '0984926565', 'ผู้ดูแลระบบ', 'ปิดการใช้งาน');

-- --------------------------------------------------------

--
-- Table structure for table `detailmatch`
--

CREATE TABLE `detailmatch` (
  `dematchID` int(3) NOT NULL,
  `matchID` int(3) NOT NULL,
  `playerID` int(3) NOT NULL,
  `score` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `facultyID` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `uniID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`facultyID`, `name`, `uniID`) VALUES
(1, 'คณะวิศวกรรมศาสตร์', 1),
(2, 'คณะศิลปศาสตร์', 1);

-- --------------------------------------------------------

--
-- Table structure for table `highlight`
--

CREATE TABLE `highlight` (
  `highlightID` int(3) NOT NULL,
  `linkvid` varchar(255) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `filePic` varchar(255) DEFAULT NULL,
  `date` date DEFAULT curdate(),
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `IDCard` varchar(13) NOT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `placeID` int(3) NOT NULL,
  `placeName` varchar(255) NOT NULL,
  `typeID` int(11) NOT NULL,
  `placeUrl` varchar(1000) NOT NULL,
  `placeFile` varchar(255) NOT NULL,
  `placeDetail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`placeID`, `placeName`, `typeID`, `placeUrl`, `placeFile`, `placeDetail`) VALUES
(1, 'สนามวอลเลย์บอล คอร์ที่ 1 โดมโรงอาหาร', 2, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d590.3092687467347!2d100.72467593033114!3d14.034888405443532!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1674098805838!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1674098322898_à¸ªà¸à¸²à¸¡.png', 'สนามวอลเลย์บอล คอร์ที่ 1 โดมโรงอาหาร');

-- --------------------------------------------------------

--
-- Table structure for table `place_opening`
--

CREATE TABLE `place_opening` (
  `openingID` int(3) NOT NULL,
  `placeID` int(3) NOT NULL,
  `day` varchar(50) DEFAULT NULL,
  `timeOpen` time DEFAULT curtime(),
  `timeClose` time DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `place_opening`
--

INSERT INTO `place_opening` (`openingID`, `placeID`, `day`, `timeOpen`, `timeClose`) VALUES
(1, 1, 'จันทร์', '08:30:00', '21:00:00'),
(2, 1, 'อังคาร', '08:30:00', '21:00:00'),
(3, 1, 'พุธ', '08:30:00', '21:00:00'),
(4, 1, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(5, 1, 'ศุกร์', '08:30:00', '21:00:00'),
(6, 1, 'เสาร์', '13:00:00', '21:00:00'),
(7, 1, 'อาทิตย์', '13:00:00', '21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `playerID` int(3) NOT NULL,
  `playerIDCard` varchar(13) NOT NULL,
  `playerStudentID` varchar(13) NOT NULL,
  `playerFName` varchar(50) NOT NULL,
  `playerLName` varchar(50) NOT NULL,
  `playerGender` enum('ชาย','หญิง') NOT NULL,
  `playerBirthday` date NOT NULL,
  `playerPhone` varchar(10) NOT NULL,
  `playerEmail` varchar(50) NOT NULL,
  `facultyID` int(3) NOT NULL,
  `teamID` int(3) DEFAULT NULL,
  `playerFile1` varchar(255) DEFAULT NULL,
  `playerFile2` varchar(255) DEFAULT NULL,
  `playerFile3` varchar(255) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `detailDoc` varchar(255) DEFAULT NULL,
  `otp` int(10) DEFAULT NULL,
  `playerStatus` enum('accept','deny','edit','wait') DEFAULT 'wait',
  `playerRegDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`playerID`, `playerIDCard`, `playerStudentID`, `playerFName`, `playerLName`, `playerGender`, `playerBirthday`, `playerPhone`, `playerEmail`, `facultyID`, `teamID`, `playerFile1`, `playerFile2`, `playerFile3`, `tnmID`, `detailDoc`, `otp`, `playerStatus`, `playerRegDate`) VALUES
(21, '1709800339819', '1163304620219', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1674065029626_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, 7, NULL, NULL, 'wait', '2023-01-19'),
(22, '1163304620243', '1163304620243', 'ชลธี', 'คำลือ', 'ชาย', '1999-05-20', '0984984094', 'chonlatee1129@gmail.com', 1, 10, '1674065333930_basketball.jpg', NULL, NULL, 8, NULL, NULL, 'wait', '2023-01-19'),
(23, '1163304620219', '1163304620219', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984984094', 'firstlnw0099@gmail.com', 2, 10, '1674065333930_basketball.jpg', NULL, NULL, 8, NULL, NULL, 'wait', '2023-01-19'),
(24, '1709800339819', '1163304620219', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2000-06-13', '0624283195', 'wasawin@gmail.com', 1, 10, '1674065333930_basketball.jpg', NULL, NULL, 8, NULL, NULL, 'wait', '2023-01-19'),
(25, '1166061065165', '6051650165106', 'กิตติภพ', 'รักสนิท', 'ชาย', '2000-01-18', '0822354389', 'kittiphop@gmail.com', 1, 10, '1674065333930_kl.jpg', NULL, NULL, 8, NULL, NULL, 'wait', '2023-01-19'),
(26, '0651061651061', '6516106510616', 'เมธานันท์', 'รัตนปัญญานนท์', 'หญิง', '2000-08-30', '0984984984', 'nun@gmail.com', 1, 10, '1674065333930_basketball.jpg', NULL, NULL, 8, NULL, NULL, 'wait', '2023-01-19'),
(27, '6501610616510', '6051610610616', 'ชลธี', 'คำลือ', 'ชาย', '2000-05-17', '0984984094', 'chonlatee1129@gmail.com', 1, 11, '1674065634445_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, 9, NULL, NULL, 'wait', '2023-01-19'),
(28, '5161616156161', '6165106510651', 'กิตติภพ', 'รักสนิท', 'ชาย', '2001-05-19', '2013132103', 'awealw@gmail.com', 1, 11, '1674065634445_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, 9, NULL, NULL, 'wait', '2023-01-19'),
(29, '1709800339819', '1163304620219', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-16', '0984984094', 'firstlnw0099@gmail.com', 1, NULL, '1674092492544_tennis.jfif', NULL, NULL, 7, 'สมัครซ้ำ', NULL, 'wait', '2023-01-19');

-- --------------------------------------------------------

--
-- Table structure for table `sport`
--

CREATE TABLE `sport` (
  `sportID` int(11) NOT NULL,
  `sportName` varchar(50) NOT NULL,
  `sportPlaynum` int(2) NOT NULL,
  `typeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sport`
--

INSERT INTO `sport` (`sportID`, `sportName`, `sportPlaynum`, `typeID`) VALUES
(1, 'แบดมินตัน ประเภทเดี่ยว', 1, 1),
(2, 'แบดมินตัน ประเภทคู่', 2, 1),
(3, 'วอลเลย์บอล', 6, 2),
(4, 'บาสเกตบอล', 5, 3),
(5, 'เปตอง ประเภทเดี่ยว', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sport_type`
--

CREATE TABLE `sport_type` (
  `typeID` int(11) NOT NULL,
  `nameType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sport_type`
--

INSERT INTO `sport_type` (`typeID`, `nameType`) VALUES
(1, 'แบดมินตัน'),
(2, 'วอลเลย์บอล'),
(3, 'บาสเกตบอล'),
(4, 'เปตอง');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `teamID` int(3) NOT NULL,
  `teamName` varchar(50) NOT NULL,
  `NameAgent` varchar(50) NOT NULL,
  `LnameAgent` varchar(50) NOT NULL,
  `teamPhoneA` varchar(10) DEFAULT NULL,
  `teamEmailA` varchar(50) DEFAULT NULL,
  `teamStatus` enum('deny','accept','wait','edit') DEFAULT 'wait',
  `teamPic` varchar(255) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `detailDoc` varchar(255) DEFAULT NULL,
  `otp` int(10) DEFAULT NULL,
  `teamRegDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`teamID`, `teamName`, `NameAgent`, `LnameAgent`, `teamPhoneA`, `teamEmailA`, `teamStatus`, `teamPic`, `tnmID`, `detailDoc`, `otp`, `teamRegDate`) VALUES
(10, 'team A', 'coachA', 'coachA', '0984926565', 'coachA@gmail.com', 'wait', '1674065333930_basketball.jpg', 8, NULL, NULL, '2023-01-19'),
(11, 'teamB', 'coachB', 'coachB', '2013132103', 'awealw@gmail.com', 'wait', '1674065634444_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', 9, NULL, NULL, '2023-01-19');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`tnmID`, `tnmName`, `sportID`, `tnmUrl`, `Rstartdate`, `Renddate`, `tnmStartdate`, `tnmEnddate`, `tnmTypegame`, `tnmDetail`, `tnmPicture`, `tnmFile1`, `tnmFile2`, `tnmFile3`, `accountID`, `st1`, `nd2`, `rd3`) VALUES
(7, 'การแข่งขันแบดมินตัน ประเภทเดี่ยว ประจำปี 2566', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-01-19', '2023-01-22', '2023-01-23', '2023-01-26', NULL, 'การแข่งขันแบดมินตัน ประเภทเดี่ยว ประจำปี 2566', '1674063992207_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', '1674063992207_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'การแข่งขันบาสเกตบอลประจำปี 2566', 4, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-01-19', '2023-01-22', '2023-01-23', '2023-01-26', NULL, 'การแข่งขันบาสเกตบอลประจำปี 2566', '1674064032851_basketball.jpg', '1674064032851_basketball.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'การแข่งขันแบดมินตัน ประเภทคู่ ประจำปี 2566', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-01-19', '2023-01-22', '2023-01-23', '2023-01-26', NULL, 'การแข่งขันแบดมินตัน ประเภทคู่ ประจำปี 2566', '1674064096922_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', '1674064096922_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `uniID` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ไม่เข้าร่วม','เข้าร่วม') NOT NULL DEFAULT 'ไม่เข้าร่วม' COMMENT 'ระดับสิทธิ์ 0 = ไม่ได้เข้าร่วม,1 = เข้าร่วม'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`uniID`, `name`, `status`) VALUES
(1, 'มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี', 'ไม่เข้าร่วม'),
(2, 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา', 'ไม่เข้าร่วม'),
(3, 'มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน', 'ไม่เข้าร่วม'),
(4, 'มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ', 'ไม่เข้าร่วม'),
(5, 'มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก', 'ไม่เข้าร่วม'),
(6, 'มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร', 'ไม่เข้าร่วม'),
(7, 'มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์', 'ไม่เข้าร่วม'),
(8, 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย', 'ไม่เข้าร่วม'),
(9, 'มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ', 'ไม่เข้าร่วม');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  ADD KEY `typeID` (`typeID`);

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
  ADD PRIMARY KEY (`sportID`),
  ADD KEY `typeID` (`typeID`);

--
-- Indexes for table `sport_type`
--
ALTER TABLE `sport_type`
  ADD PRIMARY KEY (`typeID`);

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
  MODIFY `accountID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `detailmatch`
--
ALTER TABLE `detailmatch`
  MODIFY `dematchID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `highlight`
--
ALTER TABLE `highlight`
  MODIFY `highlightID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `placeID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `place_opening`
--
ALTER TABLE `place_opening`
  MODIFY `openingID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sport`
--
ALTER TABLE `sport`
  MODIFY `sportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sport_type`
--
ALTER TABLE `sport_type`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `uniID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  ADD CONSTRAINT `place_ibfk_1` FOREIGN KEY (`typeID`) REFERENCES `sport_type` (`typeID`);

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
-- Constraints for table `sport`
--
ALTER TABLE `sport`
  ADD CONSTRAINT `sport_ibfk_1` FOREIGN KEY (`typeID`) REFERENCES `sport_type` (`typeID`);

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
