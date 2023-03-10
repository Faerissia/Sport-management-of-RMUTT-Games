-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2023 at 03:11 PM
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
(9, 'firstlnw0099@gmail.com', 'f1478fd087', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', '0984926565', 'ผู้ดูแลระบบ', 'ใช้งาน'),
(12, 'admin@admin.com', 'f1478fd087', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', '0984956546', 'เจ้าหน้าที่', 'ใช้งาน');

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
(5, 'https://youtu.be/kagoEGKHZvU', 49, NULL, '2023-03-06', 'วิดีโอเพลงทดสอบ');

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
(335, 167, 168, NULL, NULL, 3, 1, NULL, 33, '1', 1, '2023-02-24', '22:19:00', '22:19:00', 33, NULL),
(336, 169, 170, NULL, NULL, 3, 1, NULL, 33, '2', 2, '2023-02-26', '22:21:00', '22:21:00', 34, NULL),
(337, 171, 172, NULL, NULL, 3, 1, NULL, 33, '2', 3, '2023-02-26', '22:21:00', '22:21:00', 35, NULL),
(338, 173, 174, NULL, NULL, 3, 1, NULL, 33, '2', 4, '2023-02-24', '22:21:00', '22:21:00', 33, NULL),
(339, 181, 167, NULL, NULL, 3, 1, NULL, 33, '2', 5, '2023-02-21', '22:25:00', '22:25:00', 33, NULL),
(340, 169, 171, NULL, NULL, 3, 1, NULL, 33, '3', 6, '2023-02-01', '22:25:00', '22:25:00', 35, NULL),
(341, 173, 181, NULL, NULL, 3, 1, NULL, 33, '3', 7, '2023-02-01', '22:25:00', '22:25:00', 36, NULL),
(342, 169, 173, NULL, NULL, 3, 1, NULL, 33, '4', 8, '2023-03-01', '11:26:00', '17:26:00', 33, NULL),
(415, 198, 199, NULL, NULL, 3, 1, NULL, 41, '1', 1, '2023-02-27', '22:55:00', '22:55:00', 33, NULL),
(416, 200, 201, NULL, NULL, 3, 1, NULL, 41, '1', 2, '2023-02-27', '22:55:00', '22:55:00', 34, NULL),
(417, 202, 203, NULL, NULL, 3, 1, NULL, 41, '2', 3, '2023-02-27', '22:55:00', '22:56:00', 35, NULL),
(418, 204, 205, NULL, NULL, 3, 1, NULL, 41, '2', 4, '2023-02-27', '22:56:00', '22:56:00', 36, NULL),
(419, 206, 207, NULL, NULL, 3, 1, NULL, 41, '2', 5, '2023-02-27', '10:56:00', '10:56:00', 33, NULL),
(420, 198, 200, NULL, NULL, 3, 1, NULL, 41, '2', 6, '2023-02-27', '10:56:00', '10:56:00', 34, NULL),
(421, 202, 204, NULL, NULL, 3, 1, NULL, 41, '3', 7, '2023-02-27', '10:56:00', '10:56:00', 35, NULL),
(422, 206, 198, NULL, NULL, 3, 1, NULL, 41, '3', 8, '2023-02-27', '10:56:00', '10:56:00', 36, NULL),
(423, 202, 206, NULL, NULL, 3, 1, NULL, 41, '4', 9, '2023-02-28', '22:56:00', '22:56:00', 33, NULL),
(495, 208, 209, NULL, NULL, 3, 1, NULL, 42, '1', 1, '2023-02-28', '18:33:00', '18:33:00', 33, NULL),
(496, 210, 211, NULL, NULL, 3, 1, NULL, 42, '1', 2, '2023-02-28', '18:33:00', '18:33:00', 34, NULL),
(497, 212, 213, NULL, NULL, 3, 1, NULL, 42, '1', 3, '2023-02-28', '18:34:00', '18:34:00', 35, NULL),
(498, 214, 215, NULL, NULL, 3, 1, NULL, 42, '2', 4, '2023-02-28', '18:35:00', '18:35:00', 36, NULL),
(499, 216, 217, NULL, NULL, 3, 1, NULL, 42, '2', 5, '2023-02-28', '18:35:00', '18:35:00', 33, NULL),
(500, 219, 208, NULL, NULL, 3, 1, NULL, 42, '2', 6, '2023-03-01', '18:35:00', '18:35:00', 33, NULL),
(501, 210, 212, NULL, NULL, 3, 1, NULL, 42, '2', 7, '2023-03-01', '18:35:00', '18:35:00', 34, NULL),
(502, 214, 216, NULL, NULL, 3, 1, NULL, 42, '3', 8, '2023-03-01', '18:36:00', '18:36:00', 35, NULL),
(503, 219, 210, NULL, NULL, 3, 1, NULL, 42, '3', 9, '2023-03-01', '18:36:00', '18:36:00', 36, NULL),
(504, 214, 219, NULL, NULL, 3, 1, NULL, 42, '4', 10, '2023-02-27', '18:36:00', '18:36:00', 33, NULL),
(506, 182, 183, NULL, NULL, 3, 1, NULL, 38, '1', 1, '2023-03-01', '10:15:00', '11:15:00', 33, NULL),
(507, 184, 185, NULL, NULL, 3, 1, NULL, 38, '1', 2, '2023-02-28', '10:00:00', '11:00:00', 35, NULL),
(508, 186, 184, NULL, NULL, 3, 1, NULL, 38, '2', 3, '2023-03-01', '15:16:00', '16:17:00', 35, NULL),
(509, 187, 182, NULL, NULL, 3, 1, NULL, 38, '2', 4, '2023-03-01', '10:00:00', '11:00:00', 33, NULL),
(510, 186, 187, NULL, NULL, 3, 1, NULL, 38, '3', 5, '2023-02-28', '14:31:00', '15:31:00', 34, NULL),
(512, 188, 189, NULL, NULL, 3, 1, NULL, 39, '1', 1, '2023-03-01', '14:39:00', '15:39:00', 34, NULL),
(513, 190, 191, NULL, NULL, 3, 1, NULL, 39, '1', 2, '2023-03-01', '16:40:00', '17:40:00', 33, NULL),
(514, 192, 193, NULL, NULL, 3, 1, NULL, 39, '1', 3, '2023-03-10', '14:41:00', '15:41:00', 36, NULL),
(515, 194, 188, NULL, NULL, 3, 1, NULL, 39, '2', 4, '2023-03-01', '14:41:00', '18:41:00', 34, NULL),
(516, 190, 192, NULL, NULL, 3, 1, NULL, 39, '2', 5, '2023-03-29', '14:41:00', '16:41:00', 33, NULL),
(517, 194, 190, NULL, NULL, 1, 3, NULL, 39, '3', 6, '2023-03-16', '14:43:00', '16:41:00', 35, NULL),
(531, 274, 275, NULL, NULL, NULL, NULL, NULL, 48, '1', 1, NULL, NULL, NULL, NULL, NULL),
(532, 276, 277, NULL, NULL, NULL, NULL, NULL, 48, '1', 2, NULL, NULL, NULL, NULL, NULL),
(533, 278, 279, NULL, NULL, NULL, NULL, NULL, 48, '1', 3, NULL, NULL, NULL, NULL, NULL),
(534, 280, 281, NULL, NULL, NULL, NULL, NULL, 48, '1', 4, NULL, NULL, NULL, NULL, NULL),
(535, 282, 283, NULL, NULL, NULL, NULL, NULL, 48, '1', 5, NULL, NULL, NULL, NULL, NULL),
(536, 284, 285, NULL, NULL, NULL, NULL, NULL, 48, '1', 6, NULL, NULL, NULL, NULL, NULL),
(537, 286, 287, NULL, NULL, NULL, NULL, NULL, 48, '1', 7, NULL, NULL, NULL, NULL, NULL),
(538, 288, 289, NULL, NULL, NULL, NULL, NULL, 48, '1', 8, NULL, NULL, NULL, NULL, NULL),
(584, 73, 74, NULL, NULL, 3, 1, NULL, 51, '1', 1, '2023-03-06', '10:00:00', '11:00:00', 33, NULL),
(585, 75, 76, NULL, NULL, 1, 3, NULL, 51, '2', 2, '2023-03-06', '10:11:00', '11:00:00', 34, NULL),
(586, 77, 73, NULL, NULL, 1, 3, NULL, 51, '2', 3, '2023-03-06', '10:00:00', '11:00:00', 35, NULL),
(587, 76, 73, NULL, NULL, 3, 1, NULL, 51, '3', 4, '2023-03-06', '10:00:00', '11:00:00', 36, NULL),
(588, NULL, NULL, NULL, 79, NULL, NULL, 3, 52, NULL, NULL, '2023-03-06', '23:17:00', NULL, 33, NULL),
(589, NULL, NULL, NULL, 80, NULL, NULL, 1, 52, NULL, NULL, '2023-03-06', '23:17:00', NULL, 33, NULL),
(590, NULL, NULL, NULL, 81, NULL, NULL, 2, 52, NULL, NULL, '2023-03-06', '23:17:00', NULL, 33, NULL),
(591, NULL, NULL, NULL, 82, NULL, NULL, 4, 52, NULL, NULL, '2023-03-06', '23:17:00', NULL, 33, NULL),
(592, NULL, NULL, NULL, 83, NULL, NULL, 5, 52, NULL, NULL, '2023-03-06', '23:17:00', NULL, 33, NULL),
(593, NULL, NULL, 159, NULL, NULL, NULL, 3, 28, NULL, NULL, '2023-03-02', '20:00:00', '21:00:00', 33, NULL),
(594, NULL, NULL, 160, NULL, NULL, NULL, 1, 28, NULL, NULL, '2023-03-02', '20:00:00', '21:00:00', 33, NULL),
(595, NULL, NULL, 161, NULL, NULL, NULL, 2, 28, NULL, NULL, '2023-03-02', '20:00:00', '21:00:00', 33, NULL),
(596, NULL, NULL, 162, NULL, NULL, NULL, 3, 28, NULL, NULL, '2023-03-02', '20:00:00', '21:00:00', 33, NULL),
(597, NULL, NULL, 180, NULL, NULL, NULL, 4, 28, NULL, NULL, '2023-03-02', '20:00:00', '21:00:00', 33, NULL),
(598, 84, 85, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(599, 84, 86, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(600, 84, 87, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(601, 84, 88, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(602, 85, 86, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(603, 85, 87, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(604, 85, 88, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(605, 86, 87, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(606, 86, 88, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(607, 87, 88, NULL, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(618, 89, 90, NULL, NULL, 3, 1, NULL, 54, NULL, NULL, '2023-03-06', '11:00:00', '12:00:00', 33, NULL),
(619, 89, 91, NULL, NULL, 1, 3, NULL, 54, NULL, NULL, '2023-03-06', '11:00:00', '12:00:00', 34, NULL),
(620, 89, 92, NULL, NULL, 1, 3, NULL, 54, NULL, NULL, '2023-03-06', '11:00:00', '12:00:00', 35, NULL),
(621, 89, 93, NULL, NULL, 3, 1, NULL, 54, NULL, NULL, '2023-03-06', '11:00:00', '12:00:00', 36, NULL),
(622, 90, 91, NULL, NULL, 3, 1, NULL, 54, NULL, NULL, '2023-03-06', '12:00:00', '13:00:00', 33, NULL),
(623, 90, 92, NULL, NULL, 1, 3, NULL, 54, NULL, NULL, '2023-03-06', '12:00:00', '13:00:00', 34, NULL),
(624, 90, 93, NULL, NULL, 3, 1, NULL, 54, NULL, NULL, '2023-03-06', '12:00:00', '13:00:00', 35, NULL),
(625, 91, 92, NULL, NULL, 12, 11, NULL, 54, NULL, NULL, '2023-03-06', '12:00:00', '13:00:00', 36, NULL),
(626, 91, 93, NULL, NULL, 3, 1, NULL, 54, NULL, NULL, '2023-02-06', '13:00:00', '14:00:00', 33, NULL),
(627, 92, 93, NULL, NULL, 3, 1, NULL, 54, NULL, NULL, '2023-03-15', '13:00:00', '14:00:00', 33, NULL),
(652, 91, 92, NULL, NULL, 3, 1, NULL, 54, '1', 1, '2023-03-08', '10:00:00', '11:00:00', 33, NULL),
(653, 89, 90, NULL, NULL, 1, 3, NULL, 54, '1', 2, '2023-03-08', '10:00:00', '11:00:00', 34, NULL),
(657, 195, 196, NULL, NULL, 3, 1, NULL, 40, '1', 1, '2023-02-28', '12:00:00', '13:00:00', 33, NULL),
(658, 197, 195, NULL, NULL, 1, 3, NULL, 40, '2', 2, '2023-03-01', '16:00:00', '17:00:00', 36, NULL),
(664, 290, 291, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '10:00:00', '11:00:00', 33, NULL),
(665, 290, 292, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '10:00:00', '11:00:00', 34, NULL),
(666, 290, 293, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-02-03', '10:00:00', '11:00:00', 35, NULL),
(667, 290, 294, NULL, NULL, 3, 11, NULL, 49, NULL, NULL, '2023-03-03', '10:00:00', '11:00:00', 36, NULL),
(668, 291, 292, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '11:00:00', '12:00:00', 33, NULL),
(669, 291, 293, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '11:00:00', '12:00:00', 34, NULL),
(670, 291, 294, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '11:00:00', '12:00:00', 35, NULL),
(671, 292, 293, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '11:00:00', '12:00:00', 36, NULL),
(672, 292, 294, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '12:00:00', '13:00:00', 33, NULL),
(673, 293, 294, NULL, NULL, 3, 1, NULL, 49, NULL, NULL, '2023-03-03', '12:00:00', '13:00:00', 34, NULL),
(674, 290, 291, NULL, NULL, 3, 1, NULL, 49, '1', 1, '2023-03-15', '12:00:00', '13:00:00', 33, NULL),
(675, 292, 293, NULL, NULL, 3, 2, NULL, 49, '1', 2, '2023-03-09', '12:00:00', '13:00:00', 33, NULL),
(679, 290, 292, NULL, NULL, 3, 1, NULL, 49, '2', 3, '2023-03-15', '10:00:00', '12:00:00', 33, NULL),
(680, 91, 90, NULL, NULL, 3, 1, NULL, 54, '2', 3, '2023-03-08', '14:00:00', '15:00:00', 33, NULL),
(681, 343, 344, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(682, 343, 345, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(683, 343, 346, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(684, 343, 347, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(685, 343, 348, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(686, 343, 349, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(687, 343, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(688, 343, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(689, 344, 345, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(690, 344, 346, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(691, 344, 347, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(692, 344, 348, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(693, 344, 349, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(694, 344, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(695, 344, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(696, 345, 346, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(697, 345, 347, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(698, 345, 348, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(699, 345, 349, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(700, 345, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(701, 345, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(702, 346, 347, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(703, 346, 348, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(704, 346, 349, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(705, 346, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(706, 346, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(707, 347, 348, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(708, 347, 349, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(709, 347, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(710, 347, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(711, 348, 349, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(712, 348, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(713, 348, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(714, 349, 350, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(715, 349, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(716, 350, 351, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(717, 296, 297, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(718, 296, 298, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(719, 296, 299, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(720, 296, 342, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(721, 297, 298, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(722, 297, 299, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(723, 297, 342, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(724, 298, 299, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(725, 298, 342, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(726, 299, 342, NULL, NULL, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `playerStatus` enum('accept','deny','edit','wait') DEFAULT 'wait',
  `playerRegDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`playerID`, `playerIDCard`, `playerFName`, `playerLName`, `playerGender`, `playerBirthday`, `playerPhone`, `playerEmail`, `facultyID`, `teamID`, `playerFile1`, `tnmID`, `detailDoc`, `playerStatus`, `playerRegDate`) VALUES
(159, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 28, NULL, 'accept', '2023-02-20'),
(160, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 28, NULL, 'accept', '2023-02-21'),
(161, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 28, NULL, 'accept', '2023-02-21'),
(162, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 28, NULL, 'accept', '2023-02-21'),
(167, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 33, NULL, 'accept', '2023-02-20'),
(168, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 33, NULL, 'accept', '2023-02-21'),
(169, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, 'accept', '2023-02-21'),
(170, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, 'accept', '2023-02-21'),
(171, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 33, NULL, 'accept', '2023-02-20'),
(172, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 33, NULL, 'accept', '2023-02-21'),
(173, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, 'accept', '2023-02-21'),
(174, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 33, NULL, 'accept', '2023-02-21'),
(180, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 28, NULL, 'accept', '2023-02-20'),
(181, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 33, NULL, 'accept', '2023-02-20'),
(182, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 38, NULL, 'accept', '2023-02-20'),
(183, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 38, NULL, 'accept', '2023-02-21'),
(184, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 38, NULL, 'accept', '2023-02-21'),
(185, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 38, NULL, 'accept', '2023-02-21'),
(186, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 38, NULL, 'accept', '2023-02-20'),
(187, '1980494894940', 'นพดล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 38, NULL, 'accept', '2023-02-20'),
(188, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, 'accept', '2023-02-20'),
(189, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 39, NULL, 'accept', '2023-02-21'),
(190, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 39, NULL, 'accept', '2023-02-21'),
(191, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 39, NULL, 'accept', '2023-02-21'),
(192, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, 'accept', '2023-02-20'),
(193, '1980494894940', 'นพดล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, 'accept', '2023-02-20'),
(194, '1980494894940', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 39, NULL, 'accept', '2023-02-20'),
(195, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 40, NULL, 'accept', '2023-02-20'),
(196, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 40, NULL, 'accept', '2023-02-21'),
(197, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 40, NULL, 'accept', '2023-02-21'),
(198, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, 'accept', '2023-02-20'),
(199, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 41, NULL, 'accept', '2023-02-21'),
(200, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, 'accept', '2023-02-21'),
(201, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, 'accept', '2023-02-21'),
(202, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, 'accept', '2023-02-20'),
(203, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 41, NULL, 'accept', '2023-02-21'),
(204, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, 'accept', '2023-02-21'),
(205, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 41, NULL, 'accept', '2023-02-21'),
(206, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, 'accept', '2023-02-20'),
(207, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 41, NULL, 'accept', '2023-02-20'),
(208, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, 'accept', '2023-02-20'),
(209, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 42, NULL, 'accept', '2023-02-21'),
(210, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, 'accept', '2023-02-21'),
(211, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, 'accept', '2023-02-21'),
(212, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, 'accept', '2023-02-20'),
(213, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 42, NULL, 'accept', '2023-02-21'),
(214, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, 'accept', '2023-02-21'),
(215, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 42, NULL, 'accept', '2023-02-21'),
(216, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, 'accept', '2023-02-20'),
(217, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, 'accept', '2023-02-20'),
(219, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 42, NULL, 'accept', '2023-02-20'),
(220, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 44, NULL, 'accept', '2023-02-20'),
(221, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 44, NULL, 'accept', '2023-02-21'),
(222, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 44, NULL, 'accept', '2023-02-21'),
(223, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 44, NULL, 'accept', '2023-02-21'),
(224, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 44, NULL, 'accept', '2023-02-20'),
(225, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 44, NULL, 'accept', '2023-02-21'),
(226, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 44, NULL, 'accept', '2023-02-21'),
(227, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 44, NULL, 'accept', '2023-02-21'),
(228, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 44, NULL, 'accept', '2023-02-20'),
(229, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 44, NULL, 'accept', '2023-02-20'),
(230, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 44, NULL, 'accept', '2023-02-20'),
(231, '1980494894940', 'ดาลีลา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 44, NULL, 'accept', '2023-02-20'),
(232, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(233, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 45, NULL, 'accept', '2023-02-21'),
(234, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 45, NULL, 'accept', '2023-02-21'),
(235, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 45, NULL, 'accept', '2023-02-21'),
(236, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(237, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 45, NULL, 'accept', '2023-02-21'),
(238, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 45, NULL, 'accept', '2023-02-21'),
(239, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 45, NULL, 'accept', '2023-02-21'),
(240, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(241, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(242, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(243, '1980494894940', 'ดาลีลา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(244, '1980494894940', 'นิรวิทย์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 45, NULL, 'accept', '2023-02-20'),
(245, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(246, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 46, NULL, 'accept', '2023-02-21'),
(247, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 46, NULL, 'accept', '2023-02-21'),
(248, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 46, NULL, 'accept', '2023-02-21'),
(249, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(250, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 46, NULL, 'accept', '2023-02-21'),
(251, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 46, NULL, 'accept', '2023-02-21'),
(252, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 46, NULL, 'accept', '2023-02-21'),
(253, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(254, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(255, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(256, '1980494894940', 'ดาลีลา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(257, '1980494894940', 'นิรวิทย์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(258, '1980494894940', 'ธิติพงษ์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 46, NULL, 'accept', '2023-02-20'),
(259, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(260, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 47, NULL, 'accept', '2023-02-21'),
(261, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 47, NULL, 'accept', '2023-02-21'),
(262, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 47, NULL, 'accept', '2023-02-21'),
(263, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(264, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 47, NULL, 'accept', '2023-02-21'),
(265, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 47, NULL, 'accept', '2023-02-21'),
(266, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 47, NULL, 'accept', '2023-02-21'),
(267, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(268, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(269, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(270, '1980494894940', 'ดาลีลา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(271, '1980494894940', 'นิรวิทย์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(272, '1980494894940', 'ธิติพงษ์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(273, '1980494894940', 'สร้อยสวรรค์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 47, NULL, 'accept', '2023-02-20'),
(274, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(275, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 48, NULL, 'accept', '2023-02-21'),
(276, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 48, NULL, 'accept', '2023-02-21'),
(277, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 48, NULL, 'accept', '2023-02-21'),
(278, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(279, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 48, NULL, 'accept', '2023-02-21'),
(280, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 48, NULL, 'accept', '2023-02-21'),
(281, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 48, NULL, 'accept', '2023-02-21'),
(282, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(283, '1980494894940', 'ํธีรพล', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(284, '1980494894940', 'นันทชา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(285, '1980494894940', 'ดาลีลา', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(286, '1980494894940', 'นิรวิทย์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(287, '1980494894940', 'ธิติพงษ์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(288, '1980494894940', 'สร้อยสวรรค์', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(289, '1980494894940', 'คำลือ', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 48, NULL, 'accept', '2023-02-20'),
(290, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 49, NULL, 'accept', '2023-02-20'),
(291, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 49, NULL, 'accept', '2023-02-21'),
(292, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 49, NULL, 'accept', '2023-02-21'),
(293, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 49, NULL, 'accept', '2023-02-21'),
(294, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 49, NULL, 'accept', '2023-02-20'),
(296, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 50, NULL, 'accept', '2023-02-21'),
(297, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 50, NULL, 'accept', '2023-02-21'),
(298, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 50, NULL, 'accept', '2023-02-21'),
(299, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 50, NULL, 'accept', '2023-02-20'),
(300, '0654984905160', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-03', '0984956546', 'faerissia@gmail.com', 1, 73, '1677863685177_b3me2cq1z1b71.png', 51, '', 'accept', '2023-03-04'),
(301, '2168064894894', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-16', '0984984094', 'chonlatee1129@gmail.com', 1, 73, '1677863685180_b3me2cq1z1b71.png', 51, '', 'accept', '2023-03-04'),
(302, '5106519987970', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-08', '0984926565', 'firstlnw0099@gmail.com', 6, 74, '1677863866390_b3me2cq1z1b71.png', 51, '', 'accept', '2023-03-04'),
(303, '2310649879799', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-04', '0984956546', 'faerissia@gmail.com', 5, 74, '1677863866393_4584093.png', 51, '', 'accept', '2023-03-04'),
(304, '3210654978979', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-15', '0984926565', 'firstlnw0099@gmail.com', 6, 75, '1677864152984_b3me2cq1z1b71.png', 51, '', 'accept', '2023-03-04'),
(305, '2103489797907', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-15', '0984984162', 'firstlnw0099@gmail.com', 3, 75, '1677864152989_à¸ªà¸à¸²à¸¡.png', 51, '', 'accept', '2023-03-04'),
(306, '2106797978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-08', '2013132103', 'awealw@gmail.com', 5, 76, '1677864321165_b3me2cq1z1b71.png', 51, '', 'accept', '2023-03-04'),
(307, '2101659879879', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'หญิง', '2023-03-09', '0984956546', 'faerissia@gmail.com', 4, 76, '1677864321168_4584093.png', 51, '', 'accept', '2023-03-04'),
(308, '1031679879797', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-30', '0984956546', 'faerissia@gmail.com', 6, 77, '1677864472263_b3me2cq1z1b71.png', 51, '', 'accept', '2023-03-04'),
(309, '5210654978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-13', '2013132103', 'awealw@gmail.com', 3, 77, '1677864472269_4584093.png', 51, '', 'accept', '2023-03-04'),
(312, '0654984905160', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-03', '0984956546', 'faerissia@gmail.com', 1, 79, '1677863685177_b3me2cq1z1b71.png', 52, '', 'accept', '2023-03-04'),
(313, '2168064894894', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-16', '0984984094', 'chonlatee1129@gmail.com', 1, 79, '1677863685180_b3me2cq1z1b71.png', 52, '', 'accept', '2023-03-04'),
(314, '5106519987970', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-08', '0984926565', 'firstlnw0099@gmail.com', 6, 80, '1677863866390_b3me2cq1z1b71.png', 52, '', 'accept', '2023-03-04'),
(315, '2310649879799', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-04', '0984956546', 'faerissia@gmail.com', 5, 80, '1677863866393_4584093.png', 52, '', 'accept', '2023-03-04'),
(316, '3210654978979', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-15', '0984926565', 'firstlnw0099@gmail.com', 6, 81, '1677864152984_b3me2cq1z1b71.png', 52, '', 'accept', '2023-03-04'),
(317, '2103489797907', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-15', '0984984162', 'firstlnw0099@gmail.com', 3, 81, '1677864152989_à¸ªà¸à¸²à¸¡.png', 52, '', 'accept', '2023-03-04'),
(318, '2106797978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-08', '2013132103', 'awealw@gmail.com', 5, 82, '1677864321165_b3me2cq1z1b71.png', 52, '', 'accept', '2023-03-04'),
(319, '2101659879879', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'หญิง', '2023-03-09', '0984956546', 'faerissia@gmail.com', 4, 82, '1677864321168_4584093.png', 52, '', 'accept', '2023-03-04'),
(320, '1031679879797', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-30', '0984956546', 'faerissia@gmail.com', 6, 83, '1677864472263_b3me2cq1z1b71.png', 52, '', 'accept', '2023-03-04'),
(321, '5210654978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-13', '2013132103', 'awealw@gmail.com', 3, 83, '1677864472269_4584093.png', 52, '', 'accept', '2023-03-04'),
(322, '0654984905160', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-03', '0984956546', 'faerissia@gmail.com', 1, 84, '1677863685177_b3me2cq1z1b71.png', 53, '', 'accept', '2023-03-04'),
(323, '2168064894894', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-16', '0984984094', 'chonlatee1129@gmail.com', 1, 84, '1677863685180_b3me2cq1z1b71.png', 53, '', 'accept', '2023-03-04'),
(324, '5106519987970', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-08', '0984926565', 'firstlnw0099@gmail.com', 6, 85, '1677863866390_b3me2cq1z1b71.png', 53, '', 'accept', '2023-03-04'),
(325, '2310649879799', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-04', '0984956546', 'faerissia@gmail.com', 5, 85, '1677863866393_4584093.png', 53, '', 'accept', '2023-03-04'),
(326, '3210654978979', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-15', '0984926565', 'firstlnw0099@gmail.com', 6, 86, '1677864152984_b3me2cq1z1b71.png', 53, '', 'accept', '2023-03-04'),
(327, '2103489797907', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-15', '0984984162', 'firstlnw0099@gmail.com', 3, 86, '1677864152989_à¸ªà¸à¸²à¸¡.png', 53, '', 'accept', '2023-03-04'),
(328, '2106797978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-08', '2013132103', 'awealw@gmail.com', 5, 87, '1677864321165_b3me2cq1z1b71.png', 53, '', 'accept', '2023-03-04'),
(329, '2101659879879', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'หญิง', '2023-03-09', '0984956546', 'faerissia@gmail.com', 4, 87, '1677864321168_4584093.png', 53, '', 'accept', '2023-03-04'),
(330, '1031679879797', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-30', '0984956546', 'faerissia@gmail.com', 6, 88, '1677864472263_b3me2cq1z1b71.png', 53, '', 'accept', '2023-03-04'),
(331, '5210654978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-13', '2013132103', 'awealw@gmail.com', 3, 88, '1677864472269_4584093.png', 53, '', 'accept', '2023-03-04'),
(332, '0654984905160', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-03', '0984956546', 'faerissia@gmail.com', 1, 89, '1677863685177_b3me2cq1z1b71.png', 54, '', 'accept', '2023-03-04'),
(333, '2168064894894', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-16', '0984984094', 'chonlatee1129@gmail.com', 1, 89, '1677863685180_b3me2cq1z1b71.png', 54, '', 'accept', '2023-03-04'),
(334, '5106519987970', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-08', '0984926565', 'firstlnw0099@gmail.com', 6, 90, '1677863866390_b3me2cq1z1b71.png', 54, '', 'accept', '2023-03-04'),
(335, '2310649879799', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-04', '0984956546', 'faerissia@gmail.com', 5, 90, '1677863866393_4584093.png', 54, '', 'accept', '2023-03-04'),
(336, '3210654978979', 'tean5556', 'Ruaklittichai', 'ชาย', '2023-03-15', '0984926565', 'firstlnw0099@gmail.com', 6, 91, '1677864152984_b3me2cq1z1b71.png', 54, '', 'accept', '2023-03-04'),
(337, '2103489797907', 'ชลธี', 'คำลือ', 'หญิง', '2023-03-15', '0984984162', 'firstlnw0099@gmail.com', 3, 91, '1677864152989_à¸ªà¸à¸²à¸¡.png', 54, '', 'accept', '2023-03-04'),
(338, '2106797978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-08', '2013132103', 'awealw@gmail.com', 5, 92, '1677864321165_b3me2cq1z1b71.png', 54, '', 'accept', '2023-03-04'),
(339, '2101659879879', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'หญิง', '2023-03-09', '0984956546', 'faerissia@gmail.com', 4, 92, '1677864321168_4584093.png', 54, '', 'accept', '2023-03-04'),
(340, '1031679879797', 'นนทพัทธ์', 'ฤกษ์ฤทธิชัย', 'ชาย', '2023-03-30', '0984956546', 'faerissia@gmail.com', 6, 93, '1677864472263_b3me2cq1z1b71.png', 54, '', 'accept', '2023-03-04'),
(341, '5210654978979', 'กิตติภพ', 'รักสนิท', 'ชาย', '2023-03-13', '2013132103', 'awealw@gmail.com', 3, 93, '1677864472269_4584093.png', 54, '', 'accept', '2023-03-04'),
(342, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 50, NULL, 'accept', '2023-02-20'),
(343, '1980494894940', 'Nontaphat', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 55, NULL, 'accept', '2023-02-20'),
(344, '0498498065406', 'กิตติภพ', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 55, NULL, 'accept', '2023-02-21'),
(345, '6504648674949', 'ชลธี', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 55, NULL, 'accept', '2023-02-21'),
(346, '6504648674949', 'วสวิญญ์', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 55, NULL, 'accept', '2023-02-21'),
(347, '1980494894940', 'จักริน', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 55, NULL, 'accept', '2023-02-20'),
(348, '0498498065406', 'เมธานันท์', 'Ruaklittichai', 'ชาย', '2023-02-22', '0984926565', 'firstlnw0099@gmail.com', 13, NULL, '1676968871938_à¸ªà¸à¸²à¸¡.png,1676968871939_b3me2cq1z1b71.png,1676968871939_4584093.png', 55, NULL, 'accept', '2023-02-21'),
(349, '6504648674949', 'นพดล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 18, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 55, NULL, 'accept', '2023-02-21'),
(350, '6504648674949', 'ปฏิพล', 'คำลือ', 'ชาย', '2023-02-21', '0984984162', 'firstlnw0099@gmail.com', 28, NULL, '1676969165180_b3me2cq1z1b71.png,1676969165180_4584093.png', 55, NULL, 'accept', '2023-02-21'),
(351, '1980494894940', 'ธีรนัย', 'Ruaklittichai', 'ชาย', '2023-02-20', '0984926565', 'firstlnw0099@gmail.com', 1, NULL, '1676900567538_66kebb6ah7k8ejiakacgi.jpg', 55, NULL, 'accept', '2023-02-20');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Yz5zWKjuTwLHhl2u0__17nrNfm89eb5X', 1678362830, '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2023-03-09T11:53:22.057Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"loggedin\":true,\"user\":{\"accountID\":2,\"name\":\"staff\",\"lname\":\"staff\",\"level\":\"เจ้าหน้าที่\"}}');

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
(73, 'team1', 'coachA', 'coachA', '0984926565', 'firstlnw0099@gmail.com', 1, 'accept', '1677863685177_2th.me_3211764.jpg', 51, NULL, '2023-03-04'),
(74, 'teamB', 'coachB', 'coachB', '4608498797', 'firstlnw0099@gmail.com', 1, 'accept', '1677863866390_b3me2cq1z1b71.png', 51, NULL, '2023-03-04'),
(75, 'teamC', 'coachC', 'coachC', '5619089779', 'firstlnw0099@gmail.com', 1, 'accept', '1677864152983_b3me2cq1z1b71.png', 51, NULL, '2023-03-04'),
(76, 'teamD', 'coachD', 'coachD', '2301321089', 'firstlnw0099@gmail.com', 1, 'accept', '1677864321164_b3me2cq1z1b71.png', 51, NULL, '2023-03-04'),
(77, 'teamE', 'coachE', 'coachE', '0165798797', 'firstlnw0099@gmail.com', 1, 'accept', '1677864472263_b3me2cq1z1b71.png', 51, NULL, '2023-03-04'),
(79, 'team1', 'coachA', 'coachA', '0984926565', 'firstlnw0099@gmail.com', 1, 'accept', '1677863685177_2th.me_3211764.jpg', 52, NULL, '2023-03-04'),
(80, 'teamB', 'coachB', 'coachB', '4608498797', 'firstlnw0099@gmail.com', 1, 'accept', '1677863866390_b3me2cq1z1b71.png', 52, NULL, '2023-03-04'),
(81, 'teamC', 'coachC', 'coachC', '5619089779', 'firstlnw0099@gmail.com', 1, 'accept', '1677864152983_b3me2cq1z1b71.png', 52, NULL, '2023-03-04'),
(82, 'teamD', 'coachD', 'coachD', '2301321089', 'firstlnw0099@gmail.com', 1, 'accept', '1677864321164_b3me2cq1z1b71.png', 52, NULL, '2023-03-04'),
(83, 'teamE', 'coachE', 'coachE', '0165798797', 'firstlnw0099@gmail.com', 1, 'accept', '1677864472263_b3me2cq1z1b71.png', 52, NULL, '2023-03-04'),
(84, 'team1', 'coachA', 'coachA', '0984926565', 'firstlnw0099@gmail.com', 1, 'accept', '1677863685177_2th.me_3211764.jpg', 53, NULL, '2023-03-04'),
(85, 'teamB', 'coachB', 'coachB', '4608498797', 'firstlnw0099@gmail.com', 1, 'accept', '1677863866390_b3me2cq1z1b71.png', 53, NULL, '2023-03-04'),
(86, 'teamC', 'coachC', 'coachC', '5619089779', 'firstlnw0099@gmail.com', 1, 'accept', '1677864152983_b3me2cq1z1b71.png', 53, NULL, '2023-03-04'),
(87, 'teamD', 'coachD', 'coachD', '2301321089', 'firstlnw0099@gmail.com', 1, 'accept', '1677864321164_b3me2cq1z1b71.png', 53, NULL, '2023-03-04'),
(88, 'teamE', 'coachE', 'coachE', '0165798797', 'firstlnw0099@gmail.com', 1, 'accept', '1677864472263_b3me2cq1z1b71.png', 53, NULL, '2023-03-04'),
(89, 'team1', 'coachA', 'coachA', '0984926565', 'firstlnw0099@gmail.com', 1, 'accept', '1677863685177_2th.me_3211764.jpg', 54, NULL, '2023-03-04'),
(90, 'teamB', 'coachB', 'coachB', '4608498797', 'firstlnw0099@gmail.com', 1, 'accept', '1677863866390_b3me2cq1z1b71.png', 54, NULL, '2023-03-04'),
(91, 'teamC', 'coachC', 'coachC', '5619089779', 'firstlnw0099@gmail.com', 1, 'accept', '1677864152983_b3me2cq1z1b71.png', 54, NULL, '2023-03-04'),
(92, 'teamD', 'coachD', 'coachD', '2301321089', 'firstlnw0099@gmail.com', 1, 'accept', '1677864321164_b3me2cq1z1b71.png', 54, NULL, '2023-03-04'),
(93, 'teamE', 'coachE', 'coachE', '0165798797', 'firstlnw0099@gmail.com', 1, 'accept', '1677864472263_b3me2cq1z1b71.png', 54, NULL, '2023-03-04');

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
(28, 'leader เดี่ยว 5 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'leaderboard', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, '162', '180', '161'),
(33, 'single 9 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-22', '2023-02-22', '2023-02-22', NULL, 'single 8 คน', '1677084861649_4.jpg', '1677084861649_2.jpg', NULL, '169', '173', '171'),
(38, 'single 6 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, '186', '187', '184'),
(39, 'single 7 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, '190', '192', '194'),
(40, 'single 3 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, '195', NULL, NULL),
(41, 'single 10 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(42, 'single 11 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(44, 'single 12 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', NULL, 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(45, 'single 13 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', NULL, 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(46, 'single 14 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', NULL, 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(47, 'single 15 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', NULL, 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(48, 'single 16 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'single', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, NULL, NULL, NULL),
(49, 'round single 5 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'roundsingle', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, '290', '292', '291'),
(50, 'roundrobin 5 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-25', '2023-02-20', '2023-02-20', 'roundrobin', 'solosingle', '1676900517256_000_33346NG-728x485.jpg', '1676900517256_kl.jpg', NULL, '295', '296', '297'),
(51, 'team single 5', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-03', '2023-03-04', '2023-03-05', '2023-03-05', 'single', 'team single 5', '1677863260763_kl.jpg', '1677863260763_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, '76', '77', '75'),
(52, 'team leader 5', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-04', '2023-03-04', '2023-03-04', '2023-03-04', 'leaderboard', 'team single 5', '1677863260763_kl.jpg', '1677863260763_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, NULL, NULL),
(53, 'team roundrobin 5', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-04', '2023-03-04', '2023-03-04', '2023-03-04', 'roundrobin', 'team single 5', '1677863260763_kl.jpg', '1677863260763_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, NULL, NULL, NULL),
(54, 'team round single 5', 2, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-04', '2023-03-04', '2023-03-04', '2023-03-04', 'roundsingle', 'team single 5', '1677863260763_kl.jpg', '1677863260763_à¹à¸à¸à¸à¸´à¸à¹à¸à¹à¸à¸à¸²à¸£à¹à¸¥à¹à¸à¹à¸à¸à¸¡à¸´à¸à¸à¸±à¸_1.jpg', NULL, '91', '89', '92'),
(55, 'ทีม round single 9 คน', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-02-22', '2023-02-22', '2023-02-22', '2023-02-22', 'roundsingle', 'single 8 คน', '1677084861649_4.jpg', '1677084861649_2.jpg', NULL, '169', '173', '171'),
(59, 'ทดสอบการอัพโหลดแหละแสดงผลหลายไฟล์', 1, 'บัตรประชาชน และ บัตรประจำตัวนักศึกษา', '2023-03-10', '2023-03-10', '2023-03-10', '2023-03-10', NULL, 'test', '1678456013106_2th.me_3211764.jpg', '1678456013108_b3me2cq1z1b71.png,1678456013110_4584093.png', NULL, NULL, NULL, NULL);

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
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
  MODIFY `accountID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `highlight`
--
ALTER TABLE `highlight`
  MODIFY `highlightID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `matchplay`
--
ALTER TABLE `matchplay`
  MODIFY `matchID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=727;

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
  MODIFY `playerID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=352;

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
  MODIFY `teamID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tnmID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

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
