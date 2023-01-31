-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2023 at 06:44 PM
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
-- Table structure for table `matchplay`
--

CREATE TABLE `matchplay` (
  `matchID` int(3) NOT NULL,
  `participant1` int(10) DEFAULT NULL,
  `participant2` int(10) DEFAULT NULL,
  `playerID` int(10) DEFAULT NULL,
  `teamID` int(10) DEFAULT NULL,
  `score1` int(10) DEFAULT NULL,
  `score2` int(10) DEFAULT NULL,
  `score` int(10) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `round` varchar(3) DEFAULT NULL,
  `pDate` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `timeend` time DEFAULT NULL,
  `placeID` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `matchplay`
--

INSERT INTO `matchplay` (`matchID`, `participant1`, `participant2`, `playerID`, `teamID`, `score1`, `score2`, `score`, `tnmID`, `round`, `pDate`, `time`, `timeend`, `placeID`) VALUES
(256, NULL, NULL, 97, NULL, NULL, NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(257, NULL, NULL, 98, NULL, NULL, NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(258, NULL, NULL, 99, NULL, NULL, NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(259, NULL, NULL, 102, NULL, NULL, NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(260, NULL, NULL, NULL, 44, NULL, NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL),
(261, NULL, NULL, NULL, 45, NULL, NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL),
(262, NULL, NULL, NULL, 46, NULL, NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL),
(263, NULL, NULL, NULL, 47, NULL, NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL),
(264, 100, 101, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL),
(265, 100, 103, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL),
(266, 100, 104, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL),
(267, 101, 103, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL),
(268, 101, 104, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL),
(269, 103, 104, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL),
(270, 48, 49, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL),
(271, 48, 50, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL),
(272, 48, 51, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL),
(273, 49, 50, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL),
(274, 49, 51, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL),
(275, 50, 51, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL);

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
(1, 'สนามวอลเลย์บอล คอร์ที่ 1 โดมโรงอาหาร', 2, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d590.3092687467347!2d100.72467593033114!3d14.034888405443532!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1674098805838!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1674098322898_à¸ªà¸à¸²à¸¡.png', 'สนามวอลเลย์บอล คอร์ที่ 1 โดมโรงอาหาร'),
(5, 'สนามแบด1', 1, 'test', '1675141233438_kl.jpg', 'stetset'),
(32, '2', 1, '1', '1675145303958_basketball.jpg', '1');

-- --------------------------------------------------------

--
-- Table structure for table `place_opening`
--

CREATE TABLE `place_opening` (
  `openingID` int(3) NOT NULL,
  `placeID` int(3) NOT NULL,
  `day` varchar(50) DEFAULT NULL,
  `timeOpen` time DEFAULT NULL,
  `timeClose` time DEFAULT NULL
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
(7, 1, 'อาทิตย์', '13:00:00', '21:00:00'),
(54, 32, 'จันทร์', '13:08:00', '13:08:00');

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
(97, '0981891098198', '6516106161601', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-01', '0613921298', 'firstlnw0099@gmail.com', 1, NULL, '1675185197127_kl.jpg', NULL, NULL, 13, NULL, NULL, 'accept', '2023-02-01'),
(98, '1901918910919', '6841061086168', 'เมธานันท์', 'รัตนปัญญานนท์', 'ชาย', '2023-02-01', '0831140590', 'firstlnw0099@gmail.com', 2, NULL, '1675185221662_kl.jpg', NULL, NULL, 13, NULL, NULL, 'accept', '2023-02-01'),
(99, '1509198109191', '6874064646416', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-01', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1675185255147_basketball.jpg', NULL, NULL, 13, NULL, NULL, 'accept', '2023-02-01'),
(100, '8019180919819', '1381831381031', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-01', '0613921298', 'firstlnw0099@gmail.com', 2, NULL, '1675185285912_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 15, NULL, NULL, 'accept', '2023-02-01'),
(101, '0491891161616', '0494094949494', 'เมธานันท์', 'รัตนปัญญานนท์', 'หญิง', '2023-02-08', '0831140590', 'firstlnw0099@gmail.com', 2, NULL, '1675185313578_kl.jpg', NULL, NULL, 15, NULL, NULL, 'accept', '2023-02-01'),
(102, '1709840949484', '6846048640864', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-02-01', '2013132103', 'firstlnw0099@gmail.com', 2, NULL, '1675185365764_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 13, NULL, NULL, 'accept', '2023-02-01'),
(103, '0980191919191', '3874064640864', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-02-08', '0984984094', 'firstlnw0099@gmail.com', 1, NULL, '1675185391846_tennis.jfif', NULL, NULL, 15, NULL, NULL, 'accept', '2023-02-01'),
(104, '0894919109198', '3513016816106', 'กิตติภพ', 'รักสนิท', 'หญิง', '2023-01-31', '2013132103', 'firstlnw0099@gmail.com', 1, NULL, '1675185429620_kl.jpg', NULL, NULL, 15, NULL, NULL, 'accept', '2023-02-01'),
(105, '0981910919109', '9046464060460', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-21', '0613921298', 'firstlnw0099@gmail.com', 2, 44, '1675185579791_kl.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(106, '9804949898049', '6468408646840', 'เมธานันท์', 'รัตนปัญญานนท์', 'หญิง', '2023-02-01', '0831140590', 'firstlnw0099@gmail.com', 2, 44, '1675185579791_basketball.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(107, '8049499409409', '9406464068046', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-02-28', '2013132103', 'firstlnw0099@gmail.com', 2, 45, '1675185637228_kl.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(108, '1091901919191', '3840684083464', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-12', '0613921298', 'firstlnw0099@gmail.com', 2, 45, '1675185637228_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(109, '0894984094034', '6406846046464', 'เมธานันท์', 'รัตนปัญญานนท์', 'ชาย', '2023-02-21', '0831140590', 'firstlnw0099@gmail.com', 2, 46, '1675185710821_000_33346NG-728x485.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(110, '0984949409409', '3406464064640', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'หญิง', '2023-02-01', '0984926565', 'firstlnw0099@gmail.com', 2, 46, '1675185710821_basketball.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(111, '9490494940949', '3401316406846', 'เมธานันท์', 'รัตนปัญญานนท์', 'ชาย', '2023-02-28', '0831140590', 'firstlnw0099@gmail.com', 2, 47, '1675185760182_basketball.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(112, '0949848434646', '6074864604640', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-15', '0613921298', 'firstlnw0099@gmail.com', 2, 47, '1675185760183_000_33346NG-728x485.jpg', NULL, NULL, 14, '', NULL, 'accept', '2023-02-01'),
(113, '4864684648646', '0949804949840', 'จักริน', 'นิลพันธ์', 'หญิง', '2023-02-15', '0613921298', 'firstlnw0099@gmail.com', 2, 48, '1675185837546_kl.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(114, '9494940943468', '6084604646046', 'เมธานันท์', 'รัตนปัญญานนท์', 'ชาย', '2023-02-01', '0831140590', 'firstlnw0099@gmail.com', 2, 48, '1675185837546_000_33346NG-728x485.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(115, '6841646406406', '6840864064606', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-02-01', '2013132103', 'firstlnw0099@gmail.com', 2, 49, '1675185967396_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(116, '8406846406486', '6840646131313', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-01', '0613921298', 'firstlnw0099@gmail.com', 2, 49, '1675185967396_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(117, '1610681616106', '6046468406848', 'เมธานันท์', 'รัตนปัญญานนท์', 'ชาย', '2023-02-01', '0831140590', 'firstlnw0099@gmail.com', 1, 50, '1675186038674_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(118, '8049108901919', '6510616168168', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-01', '0613921298', 'firstlnw0099@gmail.com', 2, 50, '1675186038674_basketball.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(119, '0198108919819', '9046486406646', 'จักริน', 'นิลพันธ์', 'ชาย', '2023-02-28', '0613921298', 'firstlnw0099@gmail.com', 2, 51, '1675186086094_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01'),
(120, '5109198019190', '6840864640684', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-14', '0984984094', 'chonlatee1129@gmail.com', 2, 51, '1675186086095_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 16, '', NULL, 'accept', '2023-02-01');

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
(44, 'tean1', 'จักริน', 'นิลพันธ์', '0613921298', 'firstlnw0099@gmail.com', 'accept', '1675185579791_kl.jpg', 14, NULL, NULL, '2023-02-01'),
(45, 'team2', 'tea2', 'rawr2', '8498498490', 'firstlnw0099@gmail.com', 'accept', '1675185637227_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', 14, NULL, NULL, '2023-02-01'),
(46, 'team3', 'taem3', 'team3', '0984940984', 'firstlnw0099@gmail.com', 'accept', '1675185710821_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', 14, NULL, NULL, '2023-02-01'),
(47, 'tean4', 'team4', 'teanm', '7948940949', 'firstlnw0099@gmail.com', 'accept', '1675185760182_basketball.jpg', 14, NULL, NULL, '2023-02-01'),
(48, 'team1', 'team1', 'team1', '0984343464', 'firstlnw0099@gmail.com', 'accept', '1675185837546_tennis.jfif', 16, NULL, NULL, '2023-02-01'),
(49, 'tean2', 'team2', 'team2', '0894094646', 'firstlnw0099@gmail.com', 'accept', '1675185967396_kl.jpg', 16, NULL, NULL, '2023-02-01'),
(50, 'team3', 'team3', 'team3', '0894098409', 'firstlnw0099@gmail.com', 'accept', '1675186038674_kl.jpg', 16, NULL, NULL, '2023-02-01'),
(51, 'team4', 'team4', 'team4', '8490166106', 'firstlnw0099@gmail.com', 'accept', '1675186086094_66kebb6ah7k8ejiakacgi.jpg', 16, NULL, NULL, '2023-02-01');

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
(13, 'leaderboard solo', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', 'leaderboard', 'leaderboard solo', '1675185069092_tennis.jfif', '1675185069092_tennis.jfif', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'leaderboard team', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', 'leaderboard', 'leaderboard team', '1675185093833_tennis.jfif', '1675185093833_tennis.jfif', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'round robin solo', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', 'roundrobin', 'round robin solo', '1675185115964_kl.jpg', '1675185115964_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'round robin team', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', 'roundrobin', 'round robin team', '1675185138190_kl.jpg', '1675185138190_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Indexes for table `matchplay`
--
ALTER TABLE `matchplay`
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
-- AUTO_INCREMENT for table `matchplay`
--
ALTER TABLE `matchplay`
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `placeID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `place_opening`
--
ALTER TABLE `place_opening`
  MODIFY `openingID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

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
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
-- Constraints for table `matchplay`
--
ALTER TABLE `matchplay`
  ADD CONSTRAINT `matchplay_ibfk_1` FOREIGN KEY (`tnmID`) REFERENCES `tournament` (`tnmID`),
  ADD CONSTRAINT `matchplay_ibfk_2` FOREIGN KEY (`placeID`) REFERENCES `place` (`placeID`);

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
