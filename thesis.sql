-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 01:26 PM
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
(1, 'วิศวกรรมศาสตร์', 1),
(2, 'ศิลปกรรมศาสตร์', 1),
(3, 'บริหารธุรกิจ', 1),
(4, 'เทคโนโลยีคหกรรมศาสตร์', 1),
(5, 'เทคโนโลยีการเกษตร', 1),
(6, 'ครุศาสตร์อุตสาหกรรม', 1),
(7, 'วิทยาศาสตร์และเทคโนโลยี', 1),
(8, 'เทคโนโลยีสื่อสารมวลชน', 1),
(9, 'ศิลปศาสตร์', 1),
(10, 'สถาปัตยกรรมศาสตร์', 1),
(11, 'การแพทย์บูรณาการ', 1),
(12, 'พยาบาลศาสตร์', 1),
(13, 'บริหารธุรกิจและศิลปศาสตร์', 2),
(14, 'วิทยาศาสตร์และเทคโนโลยีการเกษตร', 2),
(15, 'วิศวกรรมศาสตร์', 2),
(16, 'ศิลปกรรมและสถาปัตยกรรมศาสตร์', 2),
(17, 'บริหารธุรกิจ', 3),
(18, 'วิทยาศาสตร์และศิลปศาสตร์', 3),
(19, 'วิศวกรรมศาสตร์และเทคโนโลยี', 3),
(20, 'สถาปัตยกรรมศาสตร์และศิลปกรรมสร้างสรรค์', 3),
(21, 'ครุศาสตร์อุตสาหกรรม', 3),
(22, 'วิศวกรรมศาสตร์', 3),
(23, 'บริหารธุรกิจและเทคโนโลยีสารสรเทศ', 3),
(24, 'อุตสาหกรรมและเทคโนโลยี', 3),
(25, 'ทรัพยากรธรรมชาติ', 3),
(26, 'เกษตรศาสตร์และเทคโนโลยี', 3),
(27, 'เทคโนโลยีการจัดการ', 3),
(28, 'วิศวกรรมศาสตร์', 4),
(29, 'ครุศาสตร์อุตสาหกรรม', 4),
(30, 'เทคโนโลยีคหกรรมศาสตร์', 4),
(31, 'ศิลปศาสตร์', 4),
(32, 'อุตสาหกรรมสิ่งทอ', 4),
(33, 'บริหารธุรกิจ', 4),
(34, 'วิทยาศาสตร์และเทคโนโลยี', 4),
(35, 'เกษตรศาสตร์และทรัพยากรธรรมชาติ', 5),
(36, 'วิทยาศาสตร์และเทคโนโลยี', 5),
(37, 'มนุษยศาสตร์และสังคมศาสตร์', 5),
(38, 'บริหารธุรกิจและเทคโนโลยีสารสนเทศ', 5),
(39, 'ศิลปศาสตร์', 5),
(40, 'เทคโนโลยีอุตสาหกรรมเกษตร', 5),
(41, 'เทคโนโลยีสังคม', 5),
(42, 'วิศวกรรมศาสตร์และสถาปัตยกรรมศาสตร์', 5),
(43, 'สัตวแพทยศาสตร์', 5),
(44, 'ครุศาสตร์อุตสาหกรรม', 6),
(45, 'เทคโนโลยีคหกรรมศาสตร์', 6),
(46, 'เทคโนโลยีสื่อสารมวลชน', 6),
(47, 'บริหารธุรกิจ', 6),
(48, 'วิทยาศาสตร์และเทคโนโลยี', 6),
(49, 'วิศวกรรมศาสตร์', 6),
(50, 'ศิลปศาสตร์', 6),
(51, 'อุตสาหกรรมสิ่งทอและออกแบบแฟชั่น', 6),
(52, 'สถาปัตยกรรมศาสตร์และการออกแบบ', 6),
(53, 'วิศวกรรมศาสตร์', 7),
(54, 'สถาปัตยกรรมศาสตร์และการออกแบบ', 7),
(55, 'บริหารธุรกิจ', 7),
(56, 'ศิลปศาสตร์', 7),
(57, 'อุตสาหกรรมการท่องเที่ยวและโรงแรม', 7),
(58, 'อุตสาหกรรมและเทคโนโลยี', 7),
(59, 'วิศวกรรมศาสตร์', 8),
(60, 'ศิลปศาสตร์', 8),
(61, 'บริหารธุรกิจ', 8),
(62, 'สถาปัตยกรรมศาสตร์', 8),
(63, 'ครุศาสตร์อุตสาหกรรมและเทคโนโลยี', 8),
(64, 'เกษตรศาสตร์', 8),
(65, 'สัตวแพทยศาสตร์', 8),
(66, 'วิทยาศาสตร์และเทคโนโลยี', 8),
(67, 'เทคโนโลยีการจัดการ', 8),
(68, 'อุตสาหกรรมเกษตร', 8),
(69, 'วิทยาศาสตร์และเทคโนโลยีการประมง', 8),
(70, 'วิศวกรรมศาสตร์และเทคโนโลยี', 8),
(71, 'ครุศาสตร์อุตสาหกรรม', 9),
(72, 'เทคโนโลยีการเกษตรและอุตสาหกรรมเกษตร', 9),
(73, 'บริหารธุรกิจและเทคโนโลยีสารสนเทศ', 9),
(74, 'วิทยาศาสตร์และเทคโนโลยี', 9),
(75, 'วิศวกรรมศาสตร์และสถาปัตยกรรมศาสตร์', 9),
(76, 'ศิลปศาสตร์', 9);

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

--
-- Dumping data for table `matchplay`
--

INSERT INTO `matchplay` (`matchID`, `participant1`, `participant2`, `playerID`, `teamID`, `score1`, `score2`, `score`, `tnmID`, `round`, `seed`, `pDate`, `time`, `timeend`, `placeID`) VALUES
(335, 167, 168, NULL, NULL, 3, 1, NULL, 33, '1', 1, '2023-02-24', '22:19:00', '22:19:00', 33),
(336, 169, 170, NULL, NULL, 3, 1, NULL, 33, '2', 2, '2023-02-26', '22:21:00', '22:21:00', 34),
(337, 171, 172, NULL, NULL, 3, 1, NULL, 33, '2', 3, '2023-02-26', '22:21:00', '22:21:00', 35),
(338, 173, 174, NULL, NULL, 3, 1, NULL, 33, '2', 4, '2023-02-24', '22:21:00', '22:21:00', 33),
(339, 181, 167, NULL, NULL, 3, 1, NULL, 33, '2', 5, '2023-02-21', '22:25:00', '22:25:00', 33),
(340, 169, 171, NULL, NULL, 3, 1, NULL, 33, '3', 6, '2023-02-01', '22:25:00', '22:25:00', 35),
(341, 173, 181, NULL, NULL, 3, 1, NULL, 33, '3', 7, '2023-02-01', '22:25:00', '22:25:00', 36),
(342, 169, 173, NULL, NULL, 3, 1, NULL, 33, '4', 8, '2023-02-26', '22:26:00', '22:26:00', 34),
(344, 182, 183, NULL, NULL, 3, 1, NULL, 38, '1', 1, '2023-02-26', '10:36:00', '10:36:00', 33),
(345, 184, 185, NULL, NULL, 3, 1, NULL, 38, '1', 2, '2023-02-26', '10:37:00', '10:37:00', 34),
(346, 186, 182, NULL, NULL, 3, 1, NULL, 38, '2', 3, '2023-02-26', '10:37:00', '10:37:00', 35),
(347, 187, 184, NULL, NULL, 3, 1, NULL, 38, '2', 4, '2023-02-26', '10:37:00', '10:37:00', 36),
(348, 186, 187, NULL, NULL, 3, 1, NULL, 38, '3', 5, '2023-02-25', '22:38:00', '22:38:00', 33),
(354, 188, 189, NULL, NULL, 3, 1, NULL, 39, '1', 1, '2023-01-29', '10:45:00', '10:45:00', 33),
(355, 190, 191, NULL, NULL, 3, 1, NULL, 39, '1', 2, '2023-01-29', '10:46:00', '10:46:00', 34),
(356, 192, 193, NULL, NULL, 3, 1, NULL, 39, '1', 3, '2023-01-29', '10:46:00', '10:46:00', 35),
(357, 194, 188, NULL, NULL, 3, 1, NULL, 39, '2', 4, '2023-01-29', '10:46:00', '10:46:00', 36),
(358, 190, 192, NULL, NULL, 3, 1, NULL, 39, '2', 5, '2023-01-30', '10:46:00', '10:46:00', 33),
(359, 194, 190, NULL, NULL, 3, 1, NULL, 39, '3', 6, '2023-01-30', '10:46:00', '10:46:00', 34),
(361, 195, 196, NULL, NULL, 3, 1, NULL, 40, '1', 1, '2023-02-04', '22:50:00', '22:50:00', 33),
(362, 197, 195, NULL, NULL, 3, 1, NULL, 40, '2', 2, '2023-02-25', '22:51:00', '22:51:00', 33),
(415, 198, 199, NULL, NULL, 3, 1, NULL, 41, '1', 1, '2023-02-27', '22:55:00', '22:55:00', 33),
(416, 200, 201, NULL, NULL, 3, 1, NULL, 41, '1', 2, '2023-02-27', '22:55:00', '22:55:00', 34),
(417, 202, 203, NULL, NULL, 3, 1, NULL, 41, '2', 3, '2023-02-27', '22:55:00', '22:56:00', 35),
(418, 204, 205, NULL, NULL, 3, 1, NULL, 41, '2', 4, '2023-02-27', '22:56:00', '22:56:00', 36),
(419, 206, 207, NULL, NULL, 3, 1, NULL, 41, '2', 5, '2023-02-27', '10:56:00', '10:56:00', 33),
(420, 198, 200, NULL, NULL, 3, 1, NULL, 41, '2', 6, '2023-02-27', '10:56:00', '10:56:00', 34),
(421, 202, 204, NULL, NULL, 3, 1, NULL, 41, '3', 7, '2023-02-27', '10:56:00', '10:56:00', 35),
(422, 206, 198, NULL, NULL, 3, 1, NULL, 41, '3', 8, '2023-02-27', '10:56:00', '10:56:00', 36),
(423, 202, 206, NULL, NULL, 3, 1, NULL, 41, '4', 9, '2023-02-28', '22:56:00', '22:56:00', 33),
(483, 159, 160, NULL, NULL, 3, 1, NULL, 28, '1', 1, '2023-02-28', '17:59:00', '17:59:00', 33),
(484, 161, 162, NULL, NULL, 3, 1, NULL, 28, '2', 2, '2023-02-28', '18:00:00', '18:00:00', 33),
(485, 180, 159, NULL, NULL, 3, 1, NULL, 28, '2', 3, '2023-02-28', '18:00:00', '18:00:00', 36),
(486, 161, 180, NULL, NULL, 3, 1, NULL, 28, '3', 4, '2023-02-28', '18:00:00', '18:00:00', 35),
(495, 208, 209, NULL, NULL, 3, 1, NULL, 42, '1', 1, '2023-02-28', '18:33:00', '18:33:00', 33),
(496, 210, 211, NULL, NULL, 3, 1, NULL, 42, '1', 2, '2023-02-28', '18:33:00', '18:33:00', 34),
(497, 212, 213, NULL, NULL, 3, 1, NULL, 42, '1', 3, '2023-02-28', '18:34:00', '18:34:00', 35),
(498, 214, 215, NULL, NULL, 3, 1, NULL, 42, '2', 4, '2023-02-28', '18:35:00', '18:35:00', 36),
(499, 216, 217, NULL, NULL, 3, 1, NULL, 42, '2', 5, '2023-02-28', '18:35:00', '18:35:00', 33),
(500, 219, 208, NULL, NULL, 3, 1, NULL, 42, '2', 6, '2023-03-01', '18:35:00', '18:35:00', 33),
(501, 210, 212, NULL, NULL, 3, 1, NULL, 42, '2', 7, '2023-03-01', '18:35:00', '18:35:00', 34),
(502, 214, 216, NULL, NULL, 3, 1, NULL, 42, '3', 8, '2023-03-01', '18:36:00', '18:36:00', 35),
(503, 219, 210, NULL, NULL, 3, 1, NULL, 42, '3', 9, '2023-03-01', '18:36:00', '18:36:00', 36),
(504, 214, 219, NULL, NULL, 3, 1, NULL, 42, '4', 10, '2023-02-27', '18:36:00', '18:36:00', 33);

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
  `playerFName` varchar(50) NOT NULL,
  `playerLName` varchar(50) NOT NULL,
  `playerGender` enum('ชาย','หญิง') NOT NULL,
  `playerBirthday` date NOT NULL,
  `playerPhone` varchar(10) NOT NULL,
  `playerEmail` varchar(50) NOT NULL,
  `facultyID` int(3) NOT NULL,
  `teamID` int(3) DEFAULT NULL,
  `playerFile1` varchar(255) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `detailDoc` varchar(255) DEFAULT NULL,
  `otp` int(10) DEFAULT NULL,
  `playerStatus` enum('accept','deny','edit','wait') DEFAULT 'wait',
  `playerRegDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`playerID`, `playerIDCard`, `playerFName`, `playerLName`, `playerGender`, `playerBirthday`, `playerPhone`, `playerEmail`, `facultyID`, `teamID`, `playerFile1`, `tnmID`, `detailDoc`, `otp`, `playerStatus`, `playerRegDate`) VALUES
(159, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 28, NULL, NULL, 'accept', '2023-02-20'),
(160, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 28, NULL, NULL, 'accept', '2023-02-21'),
(161, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 28, NULL, NULL, 'accept', '2023-02-21'),
(162, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 28, NULL, NULL, 'accept', '2023-02-21'),
(167, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 33, NULL, NULL, 'accept', '2023-02-20'),
(168, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 33, NULL, NULL, 'accept', '2023-02-21'),
(169, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, NULL, 'accept', '2023-02-21'),
(170, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, NULL, 'accept', '2023-02-21'),
(171, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 33, NULL, NULL, 'accept', '2023-02-20'),
(172, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 33, NULL, NULL, 'accept', '2023-02-21'),
(173, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, NULL, 'accept', '2023-02-21'),
(174, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, NULL, 'accept', '2023-02-21'),
(180, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 28, NULL, NULL, 'accept', '2023-02-20'),
(181, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 33, NULL, NULL, 'accept', '2023-02-20'),
(182, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 38, NULL, NULL, 'accept', '2023-02-20'),
(183, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 38, NULL, NULL, 'accept', '2023-02-21'),
(184, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 38, NULL, NULL, 'accept', '2023-02-21'),
(185, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 38, NULL, NULL, 'accept', '2023-02-21'),
(186, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 38, NULL, NULL, 'accept', '2023-02-20'),
(187, '1980494894940', 'นพดล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 38, NULL, NULL, 'accept', '2023-02-20'),
(188, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, NULL, 'accept', '2023-02-20'),
(189, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 39, NULL, NULL, 'accept', '2023-02-21'),
(190, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 39, NULL, NULL, 'accept', '2023-02-21'),
(191, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 39, NULL, NULL, 'accept', '2023-02-21'),
(192, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, NULL, 'accept', '2023-02-20'),
(193, '1980494894940', 'นพดล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, NULL, 'accept', '2023-02-20'),
(194, '1980494894940', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, NULL, 'accept', '2023-02-20'),
(195, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 40, NULL, NULL, 'accept', '2023-02-20'),
(196, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 40, NULL, NULL, 'accept', '2023-02-21'),
(197, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 40, NULL, NULL, 'accept', '2023-02-21'),
(198, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, NULL, 'accept', '2023-02-20'),
(199, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 41, NULL, NULL, 'accept', '2023-02-21'),
(200, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, NULL, 'accept', '2023-02-21'),
(201, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, NULL, 'accept', '2023-02-21'),
(202, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, NULL, 'accept', '2023-02-20'),
(203, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 41, NULL, NULL, 'accept', '2023-02-21'),
(204, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, NULL, 'accept', '2023-02-21'),
(205, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, NULL, 'accept', '2023-02-21'),
(206, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, NULL, 'accept', '2023-02-20'),
(207, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, NULL, 'accept', '2023-02-20'),
(208, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, NULL, 'accept', '2023-02-20'),
(209, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 42, NULL, NULL, 'accept', '2023-02-21'),
(210, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, NULL, 'accept', '2023-02-21'),
(211, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, NULL, 'accept', '2023-02-21'),
(212, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, NULL, 'accept', '2023-02-20'),
(213, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 42, NULL, NULL, 'accept', '2023-02-21'),
(214, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, NULL, 'accept', '2023-02-21'),
(215, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, NULL, 'accept', '2023-02-21'),
(216, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, NULL, 'accept', '2023-02-20'),
(217, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, NULL, 'accept', '2023-02-20'),
(218, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, NULL, 'accept', '2023-02-20'),
(219, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, NULL, 'accept', '2023-02-20');

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
  `uniID` int(10) DEFAULT NULL,
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
(28, 'single 5 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(33, 'single 9 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-22', '2023-02-22', '2023-02-22', 'single', 'single 8 คน', '1677084861649_4.jpg', '1677084861649_2.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'single 6 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(39, 'single 7 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(40, 'single 3 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(41, 'single 10 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(42, 'single 11 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL, NULL, NULL);

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
  MODIFY `accountID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `highlight`
--
ALTER TABLE `highlight`
  MODIFY `highlightID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `matchplay`
--
ALTER TABLE `matchplay`
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=506;

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
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

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
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
