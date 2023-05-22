-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysqldb
-- Generation Time: Mar 30, 2023 at 08:48 AM
-- Server version: 10.11.2-MariaDB-1:10.11.2+maria~ubu2204
-- PHP Version: 8.1.15

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
(9, 'firstlnw0099@gmail.com', 'f1478fd087', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', '0984926565', 'ผู้ดูแลระบบ', 'ใช้งาน'),
(16, 'faerissia@gmail.com', 'f1478fd087', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', '0984956546', 'เจ้าหน้าที่', 'ใช้งาน');

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
(76, 'ศิลปศาสตร์', 9),
(77, 'คณะ1', 10),
(78, 'คณะ2', 10);

-- --------------------------------------------------------

--
-- Table structure for table `highlight`
--

CREATE TABLE `highlight` (
  `highlightID` int(3) NOT NULL,
  `linkvid` varchar(1000) DEFAULT NULL,
  `tnmID` int(3) NOT NULL,
  `filePic` varchar(255) DEFAULT NULL,
  `date` date DEFAULT curdate(),
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `highlight`
--

INSERT INTO `highlight` (`highlightID`, `linkvid`, `tnmID`, `filePic`, `date`, `description`) VALUES
(10, NULL, 69, '1679550912569_MT19-20-7-6014.jpg', '2023-03-23', 'ไฮไลต์แบดมินตัน'),
(11, 'https://youtu.be/b6zo_yJ52rM', 69, NULL, '2023-03-23', 'เพลง RMUTT'),
(12, 'https://youtu.be/b6zo_yJ52rM', 69, NULL, '2023-03-23', 'เพลง RMUTT');

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
  `placeID` int(3) DEFAULT NULL,
  `matchfile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `matchplay`
--

INSERT INTO `matchplay` (`matchID`, `participant1`, `participant2`, `playerID`, `teamID`, `score1`, `score2`, `score`, `tnmID`, `round`, `seed`, `pDate`, `time`, `timeend`, `placeID`, `matchfile`) VALUES
(812, 376, 377, NULL, NULL, NULL, NULL, NULL, 69, '1', 1, NULL, NULL, NULL, NULL, NULL),
(813, 378, 379, NULL, NULL, NULL, NULL, NULL, 69, '1', 2, NULL, NULL, NULL, NULL, NULL),
(814, 380, 381, NULL, NULL, NULL, NULL, NULL, 69, '1', 3, NULL, NULL, NULL, NULL, NULL),
(815, 382, 383, NULL, NULL, NULL, NULL, NULL, 69, '1', 4, NULL, NULL, NULL, NULL, NULL),
(816, 370, 371, NULL, NULL, 3, 1, NULL, 67, '1', 1, '2023-03-23', '09:00:00', '10:00:00', 33, NULL),
(817, 373, 372, NULL, NULL, 1, 3, NULL, 67, '1', 2, '2023-03-23', '09:00:00', '10:00:00', 34, NULL),
(818, 369, 372, NULL, NULL, 1, 3, NULL, 67, '2', 3, '2023-03-23', '09:00:00', '10:00:00', 35, NULL),
(819, 374, 370, NULL, NULL, 2, 1, NULL, 67, '2', 4, '2023-03-23', '09:00:00', '10:00:00', 36, NULL),
(820, 372, 374, NULL, NULL, 1, 3, NULL, 67, '3', 5, '2023-03-22', '12:00:00', '13:00:00', 33, NULL),
(821, 386, 387, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-23', '17:02:00', '18:00:00', 38, NULL),
(822, 386, 388, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-23', '17:03:00', '18:00:00', 39, NULL),
(823, 386, 389, NULL, NULL, 1, 2, NULL, 73, NULL, NULL, '2023-03-23', '17:00:00', '18:00:00', 40, NULL),
(824, 386, 390, NULL, NULL, 2, 4, NULL, 73, NULL, NULL, '2023-03-23', '17:00:00', '18:00:00', 41, NULL),
(825, 387, 388, NULL, NULL, 2, 3, NULL, 73, NULL, NULL, '2023-03-23', '12:00:00', '13:00:00', 38, NULL),
(826, 387, 389, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-16', '12:00:00', '13:00:00', 39, NULL),
(827, 387, 390, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-23', '12:00:00', '13:00:00', 40, NULL),
(828, 388, 389, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-23', '12:00:00', '13:00:00', 41, NULL),
(829, 388, 390, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-15', '13:00:00', '14:00:00', 38, NULL),
(830, 389, 390, NULL, NULL, 3, 1, NULL, 73, NULL, NULL, '2023-03-15', '11:46:00', '12:46:00', 38, NULL),
(844, 97, 98, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-08', '18:48:00', '19:48:00', 33, NULL),
(845, 97, 99, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-16', '09:52:00', '10:52:00', 33, NULL),
(846, 97, 100, NULL, NULL, 1, 3, NULL, 74, NULL, NULL, '2023-03-16', '18:52:00', '19:52:00', 35, NULL),
(847, 97, 101, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-15', '12:00:00', '13:00:00', 33, NULL),
(848, 98, 99, NULL, NULL, 1, 3, NULL, 74, NULL, NULL, '2023-03-16', '09:00:00', '10:00:00', 33, NULL),
(849, 98, 100, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-16', '10:00:00', '11:00:00', 34, NULL),
(850, 98, 101, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-24', '10:00:00', '11:00:00', 35, NULL),
(851, 99, 100, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-16', '10:00:00', '11:00:00', 36, NULL),
(852, 99, 101, NULL, NULL, 3, 1, NULL, 74, NULL, NULL, '2023-03-16', '11:00:00', '12:00:00', 33, NULL),
(853, 100, 101, NULL, NULL, 1, 3, NULL, 74, NULL, NULL, '2023-03-17', '12:00:00', '13:00:00', 34, NULL),
(854, 97, 99, NULL, NULL, 3, 1, NULL, 74, '1', 1, '2023-03-24', '13:00:00', '14:00:00', 33, NULL),
(855, 98, 100, NULL, NULL, 1, 3, NULL, 74, '1', 2, '2023-03-16', '13:00:00', '14:00:00', 33, NULL),
(856, 97, 100, NULL, NULL, 3, 1, NULL, 74, '2', 3, '2023-03-24', '10:00:00', '12:00:00', 34, NULL),
(857, NULL, NULL, 401, NULL, NULL, NULL, 5, 75, NULL, NULL, '2023-03-17', '11:27:00', '12:27:00', 38, NULL),
(858, NULL, NULL, 402, NULL, NULL, NULL, 2, 75, NULL, NULL, '2023-03-17', '11:27:00', '12:27:00', 38, NULL),
(859, NULL, NULL, 403, NULL, NULL, NULL, 3, 75, NULL, NULL, '2023-03-17', '11:27:00', '12:27:00', 38, NULL),
(860, NULL, NULL, 404, NULL, NULL, NULL, 4, 75, NULL, NULL, '2023-03-17', '11:27:00', '12:27:00', 38, NULL);

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
(1, 'สนามวอลเลย์บอล ยิมเนเซียม', 2, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'vallayball.png', 'สนามวอลเลย์บอล คอร์ที่ 1 โดมโรงอาหาร'),
(33, 'สนามแบดมินตัน คอร์ทที่ 1', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'vallayball.png', 'สนามแบดมินตัน คอร์ทที่ 1 อยู่ในยิมเนเซียม'),
(34, 'สนามแบดมินตัน คอร์ทที่ 2', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'vallayball.png', 'สนามแบดมินตัน คอร์ทที่ 2 อยู่ในยิมเนเซียม'),
(35, 'สนามแบดมินตัน คอร์ทที่ 3', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'vallayball.png', 'สนามแบดมินตัน คอร์ทที่ 3 อยู่ในยิมเนเซียม'),
(36, 'สนามแบดมินตัน คอร์ทที่ 4', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d590.3101212252485!2d100.7242091!3d14.0345574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb25916c0d%3A0xda39222acc9700b5!2z4Lit4Liy4LiE4Liy4Lij4Lii4Li04Lih4LmA4LiZ4LmA4LiL4Li14Lii4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675302814889!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'vallayball.png', 'สนามแบดมินตัน คอร์ทที่ 4 อยู่ในยิมเนเซียม'),
(37, 'สนามบาสเกตบอล โดมข้างโรงอาหาร', 3, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1180.6179796766712!2d100.7238002!3d14.0349967!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bb2cd26b61%3A0x489d9757191f86d!2z4Lio4Li54LiZ4Lii4LmM4LiB4Li14Lis4Liy4LmD4LiZ4Lij4LmI4LihIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4o-C4suC4iuC4oeC4h-C4hOC4peC4mOC4seC4jeC4muC4uOC4o-C4tQ!5e1!3m2!1sth!2sth!4v1675303478129!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'place basketball.png', 'สนามบาสเกตบอล โดมข้างโรงอาหาร'),
(38, 'สนามเปตอง สนามที่ 1', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'patong.png', 'สนามเปตอง ลานหิน ข้างประตู 1'),
(39, 'สนามเปตอง สนามที่ 2', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'patong.png', 'สนามเปตอง สนามที่ 2 อยู่ที่ลานหิน ข้างประตู 1'),
(40, 'สนามเปตอง สนามที่ 3', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'patong.png', 'สนามเปตอง สนามที่ 3 อยู่ที่ลานหิน ข้างประตู 1'),
(41, 'สนามเปตอง สนามที่ 4', 4, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.0377415627495!2d100.72821826839049!3d14.032478741108713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78bc7fb1fced%3A0x6f762a8f3ead63bd!2z4Lil4Liy4LiZ4LiI4Lit4LiU4Lij4LiW4Lir4Lil4Lix4LiB!5e0!3m2!1sth!2sth!4v1675303779137!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'patong.png', 'สนามเปตอง สนามที่ 4 อยู่ที่ลานหิน ข้างประตู 1'),
(46, 'ภาคคอม', 1, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.8075325559485!2d100.72607136056287!3d14.03535772795209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d78a4b9055555%3A0xb899f5bb67077759!2z4Lig4Liy4LiE4Lin4Li04LiK4Liy4Lin4Li04Lio4Lin4LiB4Lij4Lij4Lih4LiE4Lit4Lih4Lie4Li04Lin4LmA4LiV4Lit4Lij4LmMIOC4hOC4k-C4sOC4p-C4tOC4qOC4p-C4geC4o-C4o-C4oeC4qOC4suC4quC4leC4o-C5jCDguKHguJfguKMu4LiY4Lix4LiN4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1679571271641!5m2!1sth!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1679571471112_badminton-1428046__480.jpg', 'ข');

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
(117, 41, 'อาทิตย์', '13:00:00', '21:00:00'),
(118, 43, 'จันทร์', '18:03:00', '19:03:00'),
(119, 45, 'จันทร์', '10:00:00', '11:11:00');

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
  `playerStatus` enum('accept','deny','edit','wait') DEFAULT 'wait',
  `playerRegDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`playerID`, `playerIDCard`, `playerFName`, `playerLName`, `playerGender`, `playerBirthday`, `playerPhone`, `playerEmail`, `facultyID`, `teamID`, `playerFile1`, `tnmID`, `detailDoc`, `playerStatus`, `playerRegDate`) VALUES
(369, '1650198797979', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 67, NULL, 'accept', '2023-03-22'),
(370, '0321654987512', 'จักริน', 'นิลพันธ์', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 26, NULL, '1679522610977_Untitled Diagram.drawio.png', 67, NULL, 'accept', '2023-03-22'),
(371, '6680213565214', 'นพดล', 'ลิ้มตระกูลเดิม', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 14, NULL, '1679522610977_Untitled Diagram.drawio.png', 67, NULL, 'accept', '2023-03-22'),
(372, '1650198797979', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 38, NULL, '1679522610977_Untitled Diagram.drawio.png', 67, NULL, 'accept', '2023-03-22'),
(373, '1650198797979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 50, NULL, '1679522610977_Untitled Diagram.drawio.png', 67, NULL, 'accept', '2023-03-22'),
(374, '1650198797979', 'ชลธี', 'คำลือ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 57, NULL, '1679522610977_Untitled Diagram.drawio.png', 67, NULL, 'accept', '2023-03-22'),
(376, '1650198797979', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(377, '0321654987512', 'จักริน', 'นิลพันธ์', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(378, '6680213565214', 'นพดล', 'ลิ้มตระกูลเดิม', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(379, '1650198797979', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(380, '1650198797979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(381, '1650198797979', 'ชลธี', 'คำลือ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(382, '1650198797979', 'เมธานันท์', 'รัตนปัญญานนท์', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(383, '1650198797979', 'ธีระพล', 'ประทาน', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 69, NULL, 'accept', '2023-03-22'),
(384, '1651068797097', 'เมธานันท์', 'รัตนปัญญานนท์', 'หญิง', '1999-06-15', '0831140590', 'firstlnw0099@gmail.com', 4, NULL, '1679550525635_kl.jpg', 72, NULL, 'wait', '2023-03-23'),
(385, '1608498049409', 'ดาลีลา', 'ปทมิน', 'หญิง', '2000-02-15', '1065490797', 'firstlnw0099@gmail.com', 31, NULL, '1679551134157_kl.jpg', 72, NULL, 'accept', '2023-03-23'),
(386, '1650198797979', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 73, NULL, 'accept', '2023-03-22'),
(387, '0321654987512', 'จักริน', 'นิลพันธ์', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 13, NULL, '1679522610977_Untitled Diagram.drawio.png', 73, NULL, 'accept', '2023-03-22'),
(388, '6680213565214', 'นพดล', 'ลิ้มตระกูลเดิม', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 17, NULL, '1679522610977_Untitled Diagram.drawio.png', 73, NULL, 'accept', '2023-03-22'),
(389, '1650198797979', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 28, NULL, '1679522610977_Untitled Diagram.drawio.png', 73, NULL, 'accept', '2023-03-22'),
(390, '1650198797979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 35, NULL, '1679522610977_Untitled Diagram.drawio.png', 73, NULL, 'accept', '2023-03-22'),
(391, '1709800339182', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-15', '0984956546', 'faerissia@gmail.com', 2, 97, '1679566971222_badminton-1428046__480.jpg', 74, '', 'wait', '2023-03-23'),
(392, '1231239491294', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-01', '2013132103', 'awealw@gmail.com', 4, 97, '1679566971318_shutterstock_1101388403-scaled.jpg', 74, '', 'wait', '2023-03-23'),
(393, '1650198797979', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, 98, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(394, '0321654987512', 'จักริน', 'นิลพันธ์', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 26, 98, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(395, '6680213565214', 'นพดล', 'ลิ้มตระกูลเดิม', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 14, 99, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(396, '1650198797979', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 38, 99, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(397, '1650198797979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 50, 100, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(398, '1650198797979', 'ชลธี', 'คำลือ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 57, 100, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(399, '1650198797979', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, 101, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(400, '0321654987512', 'จักริน', 'นิลพันธ์', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 1, 101, '1679522610977_Untitled Diagram.drawio.png', 74, NULL, 'accept', '2023-03-22'),
(401, '1650198797979', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 1, NULL, '1679522610977_Untitled Diagram.drawio.png', 75, NULL, 'accept', '2023-03-22'),
(402, '0321654987512', 'จักริน', 'นิลพันธ์', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 26, NULL, '1679522610977_Untitled Diagram.drawio.png', 75, NULL, 'accept', '2023-03-22'),
(403, '6680213565214', 'นพดล', 'ลิ้มตระกูลเดิม', 'ชาย', '2000-05-02', '0984956546', 'firstlnw0099@gmail.com', 14, NULL, '1679522610977_Untitled Diagram.drawio.png', 75, NULL, 'accept', '2023-03-22'),
(404, '1650198797979', 'วสวิญญ์', 'รัตน์โชติ', 'ชาย', '2000-05-26', '0984956546', 'firstlnw0099@gmail.com', 38, NULL, '1679522610977_Untitled Diagram.drawio.png', 75, NULL, 'accept', '2023-03-22'),
(405, '0131234543553', 'ดาลีลา', 'ปทมิน', 'หญิง', '2023-03-15', '1065490797', 'firstlnw0099@gmail.com', 4, NULL, '1679572194387_badminton-1428046__480.jpg', 72, NULL, 'accept', '2023-03-23');

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
  `teamRegDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`teamID`, `teamName`, `NameAgent`, `LnameAgent`, `teamPhoneA`, `teamEmailA`, `uniID`, `teamStatus`, `teamPic`, `tnmID`, `detailDoc`, `teamRegDate`) VALUES
(97, 'TeamA', 'CoachA', 'CoachA', '0984926565', 'firstlnw0099@gmail.com', 1, 'accept', '1679566971210_badminton-1428046__480.jpg', 74, NULL, '2023-03-23'),
(98, 'TeamB', 'CoachB', 'CoachB', '0984926565', 'firstlnw0099@gmail.com', 2, 'accept', '1679566971210_badminton-1428046__480.jpg', 74, NULL, '2023-03-23'),
(99, 'TeamC', 'CoachC', 'CoachC', '0984926565', 'firstlnw0099@gmail.com', 3, 'accept', '1679566971210_badminton-1428046__480.jpg', 74, NULL, '2023-03-23'),
(100, 'TeamD', 'CoachD', 'CoachD', '0984926565', 'firstlnw0099@gmail.com', 4, 'accept', '1679566971210_badminton-1428046__480.jpg', 74, NULL, '2023-03-23'),
(101, 'TeamE', 'CoachE', 'CoachE', '0984926565', 'firstlnw0099@gmail.com', 5, 'accept', '1679566971210_badminton-1428046__480.jpg', 74, NULL, '2023-03-23');

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
  `accountID` int(3) DEFAULT NULL,
  `st1` varchar(255) DEFAULT NULL,
  `nd2` varchar(255) DEFAULT NULL,
  `rd3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`tnmID`, `tnmName`, `sportID`, `tnmUrl`, `Rstartdate`, `Renddate`, `tnmStartdate`, `tnmEnddate`, `tnmTypegame`, `tnmDetail`, `tnmPicture`, `tnmFile1`, `accountID`, `st1`, `nd2`, `rd3`) VALUES
(67, 'แบดมินตัน ประเภทเดี่ยว 6 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-20', '2023-03-22', '2023-03-23', '2023-03-25', 'single', 'แบดมินตัน ประเภทเดี่ยว 6 คน รูปแบบการแข่งขัน แพ้คัดออก', '1679521706553_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', '1679521706557_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, '374', '370', NULL),
(69, 'แบดมินตัน ประเภทเดี่ยว 8 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-20', '2023-03-22', '2023-03-23', '2023-03-25', 'single', 'แบดมินตัน ประเภทเดี่ยว 6 คน รูปแบบการแข่งขัน แพ้คัดออก', '1679521706553_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', '1679521706557_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, NULL, NULL),
(70, 'วอลเลย์บอล หญิง', 3, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-22', '2023-03-25', '2023-03-26', '2023-03-28', NULL, 'วอลเลย์บอล หญิง', '1679547009594_5a0ef0d.jpg', '1679547009605_5a0ef0d.jpg', NULL, NULL, NULL, NULL),
(71, 'บาสเกตบอล ชาย', 4, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-22', '2023-03-24', '2023-03-25', '2023-03-27', NULL, 'บาสเกตบอล ชาย', '1679547379650_basketball.jpg', '1679547379656_basketball.jpg', NULL, NULL, NULL, NULL),
(72, 'เปตอง หญิงเดี่ยว', 5, 'บัตรประจำตัวนักศึกษา', '2023-03-22', '2023-03-24', '2023-03-25', '2023-03-27', NULL, 'เปตอง หญิงเดี่ยว', '1679550350661_kl.jpg', '1679550350665_kl.jpg', NULL, NULL, NULL, NULL),
(73, 'การแข่งขันเปตอง ชาย ประเภทเดี่ยว', 5, 'บัตรประชาชน', '2023-03-15', '2023-03-17', '2023-03-22', '2023-03-24', 'roundrobin', 'การแข่งขันเปตองชาย', '1679565068184_shutterstock_1101388403-scaled.jpg', '1679565068190_shutterstock_1101388403-scaled.jpg', NULL, '388', '386', '387'),
(74, 'แบตมินตัน ประเภทคู่', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-15', '2023-03-17', '2023-03-18', '2023-03-20', 'roundsingle', 'แบตมินตัน ประเภทคู่ round single', '1679566155288_badminton-1428046__480.jpg', '1679566155293_badminton-1428046__480.jpg', NULL, '97', '98', '99'),
(75, 'เปตอง leaderboard', 5, 'บัตรประชาชน', '2023-03-21', '2023-03-22', '2023-03-23', '2023-03-24', 'leaderboard', 'เปตอง leaderboard', '1679568014833_shutterstock_1101388403-scaled.jpg', '1679568014837_shutterstock_1101388403-scaled.jpg', NULL, '401', '404', '403'),
(76, 'ทดสอบ1', 1, 'บัตรประชาชน', '2023-03-23', '2023-03-23', '2023-03-23', '2023-03-24', NULL, 'ทดสอบ1', '1679572025755_badminton-1428046__480.jpg', '1679572025761_badminton-1428046__480.jpg', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `uniID` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ไม่เข้าร่วม','เข้าร่วม') NOT NULL DEFAULT 'ไม่เข้าร่วม' COMMENT 'ระดับสิทธิ์ 0 = ไม่ได้เข้าร่วม,1 = เข้าร่วม',
  `initials` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`uniID`, `name`, `status`, `initials`) VALUES
(1, 'มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี', 'เข้าร่วม', 'RMUTT'),
(2, 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา', 'เข้าร่วม', 'RMUTL'),
(3, 'มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน', 'เข้าร่วม', 'RMUTI'),
(4, 'มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ', 'เข้าร่วม', 'RMUTK'),
(5, 'มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก', 'เข้าร่วม', 'RMUTTO'),
(6, 'มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร', 'เข้าร่วม', 'RMUTP'),
(7, 'มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์', 'เข้าร่วม', 'RMUTR'),
(8, 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย', 'เข้าร่วม', 'RMUTSV'),
(9, 'มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ', 'เข้าร่วม', 'RMUTSB'),
(10, ' ม.ธัญ', 'เข้าร่วม', NULL);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accountID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `highlight`
--
ALTER TABLE `highlight`
  MODIFY `highlightID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `matchplay`
--
ALTER TABLE `matchplay`
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=861;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `placeID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `place_opening`
--
ALTER TABLE `place_opening`
  MODIFY `openingID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=406;

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
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `uniID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
