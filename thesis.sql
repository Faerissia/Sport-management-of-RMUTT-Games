-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2023 at 07:22 AM
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
  `seed` int(10) DEFAULT NULL,
  `pDate` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `timeend` time DEFAULT NULL,
  `placeID` int(3) DEFAULT NULL
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
(1, 'สนามวอลเลย์บอล ยิมเนเซียม', 2, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303121339_à¸¢à¸´à¸¡.png', 'สนามวอลเลย์บอล คอร์ที่ 1 โดมโรงอาหาร'),
(33, 'สนามแบดมินตัน คอร์ทที่ 1', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303121339_à¸¢à¸´à¸¡.png', 'สนามแบดมินตัน คอร์ทที่ 1 อยู่ในยิมเนเซียม'),
(34, 'สนามแบดมินตัน คอร์ทที่ 2', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303121339_à¸¢à¸´à¸¡.png', 'สนามแบดมินตัน คอร์ทที่ 2 อยู่ในยิมเนเซียม'),
(35, 'สนามแบดมินตัน คอร์ทที่ 3', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303121339_à¸¢à¸´à¸¡.png', 'สนามแบดมินตัน คอร์ทที่ 3 อยู่ในยิมเนเซียม'),
(36, 'สนามแบดมินตัน คอร์ทที่ 4', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303121339_à¸¢à¸´à¸¡.png', 'สนามแบดมินตัน คอร์ทที่ 4 อยู่ในยิมเนเซียม'),
(37, 'สนามบาสเกตบอล โดมข้างโรงอาหาร', 3, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1180.6179796766712!2d100.7238002!3d14.0349967!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb2cd26b61%3A0x489d9757191f86d!2z4Lio4Li54LiZ4Lii4LmM4LiB4Li14Lis4Liy4LmD4LiZ4Lij4LmI4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675303478129!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303507346_à¸à¸²à¸ª.png', 'สนามบาสเกตบอล โดมข้างโรงอาหาร'),
(38, 'สนามเปตอง สนามที่ 1', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303896023_à¹à¸à¸à¸­à¸.png', 'สนามเปตอง ลานหิน ข้างประตู 1'),
(39, 'สนามเปตอง สนามที่ 2', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303896023_à¹à¸à¸à¸­à¸.png', 'สนามเปตอง สนามที่ 2 อยู่ที่ลานหิน ข้างประตู 1'),
(40, 'สนามเปตอง สนามที่ 3', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303896023_à¹à¸à¸à¸­à¸.png', 'สนามเปตอง สนามที่ 3 อยู่ที่ลานหิน ข้างประตู 1'),
(41, 'สนามเปตอง สนามที่ 4', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1675303896023_à¹à¸à¸à¸­à¸.png', 'สนามเปตอง สนามที่ 4 อยู่ที่ลานหิน ข้างประตู 1');

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
(55, 33, 'จันทร์', '08:30:00', '21:00:00'),
(56, 33, 'อังคาร', '08:30:00', '21:00:00'),
(57, 33, 'พุธ', '08:30:00', '21:00:00'),
(58, 33, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(59, 33, 'ศุกร์', '08:30:00', '21:00:00'),
(60, 33, 'เสาร์', '13:00:00', '21:00:00'),
(61, 33, 'อาทิตย์', '13:00:00', '21:00:00'),
(62, 34, 'จันทร์', '08:30:00', '21:00:00'),
(63, 34, 'อังคาร', '08:30:00', '21:00:00'),
(64, 34, 'พุธ', '08:30:00', '21:00:00'),
(65, 34, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(66, 34, 'ศุกร์', '08:30:00', '21:00:00'),
(67, 34, 'เสาร์', '13:00:00', '21:00:00'),
(68, 34, 'อาทิตย์', '13:00:00', '21:00:00'),
(69, 35, 'จันทร์', '08:30:00', '21:00:00'),
(70, 35, 'อังคาร', '08:30:00', '21:00:00'),
(71, 35, 'พุธ', '08:30:00', '21:00:00'),
(72, 35, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(73, 35, 'ศุกร์', '08:30:00', '21:00:00'),
(74, 35, 'เสาร์', '13:00:00', '21:00:00'),
(75, 35, 'อาทิตย์', '13:00:00', '21:00:00'),
(76, 36, 'จันทร์', '08:30:00', '21:00:00'),
(77, 36, 'อังคาร', '08:30:00', '21:00:00'),
(78, 36, 'พุธ', '08:30:00', '21:00:00'),
(79, 36, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(80, 36, 'ศุกร์', '08:30:00', '21:00:00'),
(81, 36, 'เสาร์', '13:00:00', '21:00:00'),
(82, 36, 'อาทิตย์', '13:00:00', '21:00:00'),
(83, 37, 'จันทร์', '08:30:00', '21:00:00'),
(84, 37, 'อังคาร', '08:30:00', '21:00:00'),
(85, 37, 'พุธ', '08:30:00', '21:00:00'),
(86, 37, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(87, 37, 'ศุกร์', '08:30:00', '21:00:00'),
(88, 37, 'เสาร์', '13:00:00', '21:00:00'),
(89, 37, 'อาทิตย์', '13:00:00', '21:00:00'),
(90, 38, 'จันทร์', '08:30:00', '21:00:00'),
(91, 38, 'อังคาร', '08:30:00', '21:00:00'),
(92, 38, 'พุธ', '08:30:00', '21:00:00'),
(93, 38, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(94, 38, 'ศุกร์', '08:30:00', '21:00:00'),
(95, 38, 'เสาร์', '13:00:00', '21:00:00'),
(96, 38, 'อาทิตย์', '13:00:00', '21:00:00'),
(97, 39, 'จันทร์', '08:30:00', '21:00:00'),
(98, 39, 'อังคาร', '08:30:00', '21:00:00'),
(99, 39, 'พุธ', '08:30:00', '21:00:00'),
(100, 39, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(101, 39, 'ศุกร์', '08:30:00', '21:00:00'),
(102, 39, 'เสาร์', '13:00:00', '21:00:00'),
(103, 39, 'อาทิตย์', '13:00:00', '21:00:00'),
(104, 40, 'จันทร์', '08:30:00', '21:00:00'),
(105, 40, 'อังคาร', '08:30:00', '21:00:00'),
(106, 40, 'พุธ', '08:30:00', '21:00:00'),
(107, 40, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(108, 40, 'ศุกร์', '08:30:00', '21:00:00'),
(109, 40, 'เสาร์', '13:00:00', '21:00:00'),
(110, 40, 'อาทิตย์', '13:00:00', '21:00:00'),
(111, 41, 'จันทร์', '08:30:00', '21:00:00'),
(112, 41, 'อังคาร', '08:30:00', '21:00:00'),
(113, 41, 'พุธ', '08:30:00', '21:00:00'),
(114, 41, 'พฤหัสบดี', '08:30:00', '21:00:00'),
(115, 41, 'ศุกร์', '08:30:00', '21:00:00'),
(116, 41, 'เสาร์', '13:00:00', '21:00:00'),
(117, 41, 'อาทิตย์', '13:00:00', '21:00:00');

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
(127, '1650165106161', '6804864086486', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-02-09', '0984984094', 'firstlnw0099@gmail.com', 1, NULL, '1675917540170_kl.jpg', NULL, NULL, 20, NULL, NULL, 'accept', '2023-02-09'),
(128, '1606516041861', '6840646464064', 'เมธานันท์', 'นิลพันธ์', 'ชาย', '2023-01-31', '0613921298', 'firstlnw0099@gmail.com', 1, NULL, '1675917585503_kl.jpg', NULL, NULL, 20, NULL, NULL, 'accept', '2023-02-09'),
(129, '1098409189194', '6807437043464', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-02-21', '2013132103', 'firstlnw0099@gmail.com', 2, NULL, '1675917618880_kl.jpg', NULL, NULL, 20, NULL, NULL, 'accept', '2023-02-09'),
(130, '1610964816408', '6087370373740', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-01', '0984984094', 'firstlnw0099@gmail.com', 2, NULL, '1675917662596_kl.jpg', NULL, NULL, 20, NULL, NULL, 'accept', '2023-02-09'),
(131, '1096846464064', '6384348304341', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2023-02-10', '0624283195', 'firstlnw0099@gmail.com', 2, NULL, '1675917704419_66kebb6ah7k8ejiakacgi.jpg', NULL, NULL, 20, NULL, NULL, 'accept', '2023-02-09');

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
(20, 'single elimination solo', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-08', '2023-02-08', '2023-02-08', '2023-02-08', NULL, 'single elimination solo', '1675866460866_basketball.jpg', '1675866460866_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL);

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
(1, 'มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี', 'เข้าร่วม'),
(2, 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา', 'เข้าร่วม'),
(3, 'มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน', 'เข้าร่วม'),
(4, 'มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ', 'เข้าร่วม'),
(5, 'มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก', 'เข้าร่วม'),
(6, 'มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร', 'เข้าร่วม'),
(7, 'มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์', 'เข้าร่วม'),
(8, 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย', 'เข้าร่วม'),
(9, 'มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ', 'เข้าร่วม');

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
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `placeID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `place_opening`
--
ALTER TABLE `place_opening`
  MODIFY `openingID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

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
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
