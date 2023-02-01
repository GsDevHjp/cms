-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 31, 2023 at 12:37 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

DROP TABLE IF EXISTS `admin_tbl`;
CREATE TABLE IF NOT EXISTS `admin_tbl` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(30) NOT NULL,
  `admin_user_id` varchar(30) NOT NULL,
  `admin_password` varchar(10) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`admin_id`, `admin_name`, `admin_user_id`, `admin_password`) VALUES
(1, 'Amarjeet Kumar', 'admin@gmail.com', 'admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `admission_tbl`
--

DROP TABLE IF EXISTS `admission_tbl`;
CREATE TABLE IF NOT EXISTS `admission_tbl` (
  `admission_id` int(11) NOT NULL AUTO_INCREMENT,
  `std_id_fk` int(11) NOT NULL,
  `std_mobile` bigint(10) NOT NULL,
  `course_id_fk` int(11) NOT NULL,
  `batch_id_fk` int(11) NOT NULL,
  `admission_fee` bigint(30) NOT NULL,
  `std_date` date NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`admission_id`),
  KEY `admin_id_fk` (`admin_id_fk`),
  KEY `batch_id_fk` (`batch_id_fk`),
  KEY `course_id_fk` (`course_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admission_tbl`
--

INSERT INTO `admission_tbl` (`admission_id`, `std_id_fk`, `std_mobile`, `course_id_fk`, `batch_id_fk`, `admission_fee`, `std_date`, `admin_id_fk`) VALUES
(7, 2, 8754123265, 2, 1, 1500, '2023-01-04', 1),
(8, 2, 8754123265, 2, 1, 3000, '2020-04-23', 1),
(9, 2, 8754123265, 2, 1, 3000, '2023-02-01', 1),
(10, 2, 8754123265, 2, 2, 3000, '2023-01-09', 1),
(11, 1, 9865231254, 1, 1, 750, '2023-01-09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `batch_tbl`
--

DROP TABLE IF EXISTS `batch_tbl`;
CREATE TABLE IF NOT EXISTS `batch_tbl` (
  `batch_id` int(20) NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(30) NOT NULL,
  `batch_status` varchar(25) NOT NULL,
  `batch_date` date NOT NULL,
  `batch_arrival` time NOT NULL,
  `batch_departure` time NOT NULL,
  `course_id_fk` int(11) NOT NULL,
  `institute_id_fk` int(11) DEFAULT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `admin_id_fk` (`admin_id_fk`),
  KEY `course_id_fk` (`course_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `batch_tbl`
--

INSERT INTO `batch_tbl` (`batch_id`, `batch_name`, `batch_status`, `batch_date`, `batch_arrival`, `batch_departure`, `course_id_fk`, `institute_id_fk`, `admin_id_fk`) VALUES
(1, 'HTML Class', 'Running', '2023-01-28', '23:56:00', '23:57:00', 1, NULL, 1),
(2, 'C Programming', 'Completed', '2023-01-30', '23:59:00', '23:59:00', 4, NULL, 1),
(3, 'jn kj', 'Yet to start', '2023-01-31', '05:06:00', '06:05:00', 1, NULL, 1),
(4, 'bcnkjds', 'Yet to start', '2023-01-31', '06:05:00', '05:06:00', 1, 65, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_tbl`
--

DROP TABLE IF EXISTS `course_tbl`;
CREATE TABLE IF NOT EXISTS `course_tbl` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) NOT NULL,
  `course_total_fee` float NOT NULL,
  `course_half_fee` float NOT NULL,
  `course_quarter_fee` float NOT NULL,
  `course_monthly_fee` float NOT NULL,
  `course_admission_fee` float NOT NULL,
  `course_duration` bigint(20) NOT NULL,
  `course_description` varchar(100) NOT NULL,
  `course_date` date NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_tbl`
--

INSERT INTO `course_tbl` (`course_id`, `course_name`, `course_total_fee`, `course_half_fee`, `course_quarter_fee`, `course_monthly_fee`, `course_admission_fee`, `course_duration`, `course_description`, `course_date`, `admin_id_fk`) VALUES
(1, 'MCA', 45000, 22500, 15000, 10, 21000, 10, 'GS', '2023-01-30', 1),
(2, 'BCA', 1500, 750, 500, 5454, 1500, 60, 'Hajipur', '2023-01-31', 1),
(4, 'MCA', 20000, 10000, 6666.67, 50, 566, 65, 'Bidupur', '2023-01-30', 1),
(5, '12th', 656556, 328278, 218852, 56565, 65665, 56, 'Mahua', '2023-01-31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `enquiry_tbl`
--

DROP TABLE IF EXISTS `enquiry_tbl`;
CREATE TABLE IF NOT EXISTS `enquiry_tbl` (
  `enq_id` int(11) NOT NULL AUTO_INCREMENT,
  `enq_name` varchar(50) NOT NULL,
  `enq_father_name` varchar(50) NOT NULL,
  `enq_mobile` bigint(10) NOT NULL,
  `enq_date` date NOT NULL,
  `enq_gender` varchar(10) NOT NULL,
  `enq_address` varchar(200) NOT NULL,
  `course_id_fk` int(11) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`enq_id`),
  KEY `admin_id_fk` (`admin_id_fk`),
  KEY `course_id_fk` (`course_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enquiry_tbl`
--

INSERT INTO `enquiry_tbl` (`enq_id`, `enq_name`, `enq_father_name`, `enq_mobile`, `enq_date`, `enq_gender`, `enq_address`, `course_id_fk`, `admin_id_fk`) VALUES
(1, 'Akhilesh Kumar', 'Kumar Akhilesh', 7845122356, '2023-01-31', 'male', 'Hajipur ', 1, 1),
(2, 'Munna Kr', 'Kumar Munna', 8745212356, '2023-01-30', 'male', 'Hajipur sadbajh', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `exp_tbl`
--

DROP TABLE IF EXISTS `exp_tbl`;
CREATE TABLE IF NOT EXISTS `exp_tbl` (
  `exp_id` int(11) NOT NULL AUTO_INCREMENT,
  `exp_select` varchar(20) NOT NULL,
  `exp_pay` bigint(20) NOT NULL,
  `exp_mobile` bigint(10) NOT NULL,
  `exp_amount` bigint(20) NOT NULL,
  `exp_invoice` varchar(20) NOT NULL,
  `exp_date` date NOT NULL,
  `exp_adr` varchar(60) NOT NULL,
  `exp_photo` varchar(20) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`exp_id`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exp_tbl`
--

INSERT INTO `exp_tbl` (`exp_id`, `exp_select`, `exp_pay`, `exp_mobile`, `exp_amount`, `exp_invoice`, `exp_date`, `exp_adr`, `exp_photo`, `admin_id_fk`) VALUES
(1, 'Room Rent', 9856, 8956231254, 895623, '568989', '2023-06-05', 'Hajipur', 'hd-wallpaper.jpg', 1),
(2, 'Electricity Bill', 5698, 5689784512, 5689, '6656', '2023-06-05', 'hajipur', 'lecture 11.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fee_tbl`
--

DROP TABLE IF EXISTS `fee_tbl`;
CREATE TABLE IF NOT EXISTS `fee_tbl` (
  `fee_id` int(11) NOT NULL AUTO_INCREMENT,
  `fee_type` varchar(20) NOT NULL,
  `fee_monthly` varchar(20) NOT NULL,
  `fee_mode` varchar(15) NOT NULL,
  `fee_amount` float NOT NULL,
  `fee_description` varchar(100) NOT NULL,
  `fee_date` date NOT NULL,
  `student_id_fk` int(11) NOT NULL,
  `course_id_fk` int(11) NOT NULL,
  `batch_id_fk` int(11) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`fee_id`),
  KEY `admin_id_fk` (`admin_id_fk`),
  KEY `student_id_fk` (`student_id_fk`),
  KEY `course_id_fk` (`course_id_fk`),
  KEY `batch_id_fk` (`batch_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fee_tbl`
--

INSERT INTO `fee_tbl` (`fee_id`, `fee_type`, `fee_monthly`, `fee_mode`, `fee_amount`, `fee_description`, `fee_date`, `student_id_fk`, `course_id_fk`, `batch_id_fk`, `admin_id_fk`) VALUES
(1, 'Admission Fee', 'January', 'Online', 6598, 'Gs', '2023-01-31', 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `inst_book_tbl`
--

DROP TABLE IF EXISTS `inst_book_tbl`;
CREATE TABLE IF NOT EXISTS `inst_book_tbl` (
  `inst_book_id` int(11) NOT NULL AUTO_INCREMENT,
  `inst_book_title` varchar(20) NOT NULL,
  `inst_book_img` varchar(200) DEFAULT NULL,
  `inst_book_description` varchar(100) NOT NULL,
  `course_id_fk` int(11) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`inst_book_id`),
  KEY `admin_id_fk` (`admin_id_fk`),
  KEY `course_id_fk` (`course_id_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notification_tbl`
--

DROP TABLE IF EXISTS `notification_tbl`;
CREATE TABLE IF NOT EXISTS `notification_tbl` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `notification` varchar(20) NOT NULL,
  `description` varchar(20) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_tbl`
--

INSERT INTO `notification_tbl` (`notification_id`, `notification`, `description`, `admin_id_fk`) VALUES
(1, 'H! How Are You', 'Yes I\'m Fine', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_tbl`
--

DROP TABLE IF EXISTS `quiz_tbl`;
CREATE TABLE IF NOT EXISTS `quiz_tbl` (
  `quiz_id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_question` varchar(100) NOT NULL,
  `quiz_option_a` varchar(25) NOT NULL,
  `quiz_option_b` varchar(25) NOT NULL,
  `quiz_option_c` varchar(25) NOT NULL,
  `quiz_option_d` varchar(25) NOT NULL,
  `quiz_answer` varchar(50) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quiz_tbl`
--

INSERT INTO `quiz_tbl` (`quiz_id`, `quiz_question`, `quiz_option_a`, `quiz_option_b`, `quiz_option_c`, `quiz_option_d`, `quiz_answer`, `admin_id_fk`) VALUES
(2, 'H!', 'DATA', 'TATA', 'PATA', 'NAKA', 'TATA', 1),
(3, 'ABC', 'a', 'b', 'c', 'd', 'a', 1);

-- --------------------------------------------------------

--
-- Table structure for table `salary_tbl`
--

DROP TABLE IF EXISTS `salary_tbl`;
CREATE TABLE IF NOT EXISTS `salary_tbl` (
  `salary_id` int(11) NOT NULL AUTO_INCREMENT,
  `salary_mobile` bigint(10) NOT NULL,
  `staff_id` varchar(15) NOT NULL,
  `salary_add_salary` varchar(30) NOT NULL,
  `salary_month` varchar(10) NOT NULL,
  `salary_payment` varchar(20) NOT NULL,
  `salary_amount` float NOT NULL,
  `salary_duse` float NOT NULL,
  `salary_date` date NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`salary_id`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `salary_tbl`
--

INSERT INTO `salary_tbl` (`salary_id`, `salary_mobile`, `staff_id`, `salary_add_salary`, `salary_month`, `salary_payment`, `salary_amount`, `salary_duse`, `salary_date`, `admin_id_fk`) VALUES
(1, 5698321245, 'GS102', '500', 'January', 'PayPal', 5656, 6565, '2023-05-06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff_tbl`
--

DROP TABLE IF EXISTS `staff_tbl`;
CREATE TABLE IF NOT EXISTS `staff_tbl` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(30) NOT NULL,
  `staff_qualification` varchar(50) NOT NULL,
  `staff_mobile` bigint(10) NOT NULL,
  `staff_email` varchar(30) NOT NULL,
  `staff_aadhar` bigint(12) NOT NULL,
  `staff_pan` bigint(10) NOT NULL,
  `staff_gen` varchar(8) NOT NULL,
  `staff_account` float NOT NULL,
  `staff_ifsc` varchar(20) NOT NULL,
  `staff_date` date NOT NULL,
  `staff_adr` varchar(60) NOT NULL,
  `staff_role` varchar(15) NOT NULL,
  `staff_salary` float NOT NULL,
  `staff_state` varchar(15) NOT NULL,
  `staff_district` varchar(15) NOT NULL,
  `staff_photo` varchar(200) NOT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_mobile` (`staff_mobile`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff_tbl`
--

INSERT INTO `staff_tbl` (`staff_id`, `staff_name`, `staff_qualification`, `staff_mobile`, `staff_email`, `staff_aadhar`, `staff_pan`, `staff_gen`, `staff_account`, `staff_ifsc`, `staff_date`, `staff_adr`, `staff_role`, `staff_salary`, `staff_state`, `staff_district`, `staff_photo`, `admin_id_fk`) VALUES
(4, 'Akhilesh Kumar', 'BCA', 7845122356, 'akhilesh@gmail.com', 985632124578, 56988965, 'male', 658987000000, 'GS202101', '2023-05-06', 'Nakhas Chauk', '5698565632', 655665, 'Panjab', 'Muzaffarpur', 'lecture 11.png', 1),
(5, 'Munna', 'BCA', 7845122365, 'munna@gmail.com', 788965541223, 8956548789, 'male', 784599000000, 'GS2021', '2023-01-19', 'Paswan Chauk', '98657845', 89562300, 'Panjab', 'Patna', 'lecture 11.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_tbl`
--

DROP TABLE IF EXISTS `student_tbl`;
CREATE TABLE IF NOT EXISTS `student_tbl` (
  `std_id` int(11) NOT NULL AUTO_INCREMENT,
  `std_name` varchar(20) NOT NULL,
  `std_father_name` varchar(20) DEFAULT NULL,
  `std_father_occupation` varchar(50) DEFAULT NULL,
  `std_mobile` bigint(10) NOT NULL,
  `std_aadhar` bigint(12) DEFAULT NULL,
  `std_email` varchar(30) NOT NULL,
  `std_dob` date DEFAULT NULL,
  `std_gender` varchar(10) NOT NULL,
  `std_state` varchar(50) DEFAULT NULL,
  `std_district` varchar(50) DEFAULT NULL,
  `std_date` date NOT NULL,
  `std_img` varchar(200) NOT NULL,
  `std_address` varchar(200) DEFAULT NULL,
  `institute_id_fk` int(11) DEFAULT NULL,
  `admin_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`std_id`),
  KEY `admin_id_fk` (`admin_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_tbl`
--

INSERT INTO `student_tbl` (`std_id`, `std_name`, `std_father_name`, `std_father_occupation`, `std_mobile`, `std_aadhar`, `std_email`, `std_dob`, `std_gender`, `std_state`, `std_district`, `std_date`, `std_img`, `std_address`, `institute_id_fk`, `admin_id_fk`) VALUES
(1, 'Akhilesh kumar', 'Kumar Akhilesh', 'Student', 1254878998, 98565214587, 'akhilesh@gmail.com', '1997-05-06', 'male', 'Bihar', 'Vaishali', '2023-01-30', 'hd-wallpaper.jpg', 'Hajipur GS', NULL, 1),
(2, 'Amarjeet Kumar', 'AKC', 'Business', 7854123265, 785421235698, 'amarjeet@gmail.com', '2001-01-01', 'male', 'Bihar', 'Vaishali', '2023-01-30', 'amarjeet.jpeg', 'hjp', NULL, 1),
(3, 'Ayush Kumar', 'kumar', 'std', 9865321245, 6589893235689, 'ayush@gmail.com', '2023-06-05', 'male', 'Panjab', 'Muzaffarpur', '2023-01-30', 'lecture 12.png', 'hjp', NULL, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admission_tbl`
--
ALTER TABLE `admission_tbl`
  ADD CONSTRAINT `admission_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`),
  ADD CONSTRAINT `admission_tbl_ibfk_2` FOREIGN KEY (`batch_id_fk`) REFERENCES `batch_tbl` (`batch_id`),
  ADD CONSTRAINT `admission_tbl_ibfk_3` FOREIGN KEY (`course_id_fk`) REFERENCES `course_tbl` (`course_id`);

--
-- Constraints for table `batch_tbl`
--
ALTER TABLE `batch_tbl`
  ADD CONSTRAINT `batch_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`),
  ADD CONSTRAINT `batch_tbl_ibfk_2` FOREIGN KEY (`course_id_fk`) REFERENCES `course_tbl` (`course_id`);

--
-- Constraints for table `course_tbl`
--
ALTER TABLE `course_tbl`
  ADD CONSTRAINT `course_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `enquiry_tbl`
--
ALTER TABLE `enquiry_tbl`
  ADD CONSTRAINT `enquiry_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`),
  ADD CONSTRAINT `enquiry_tbl_ibfk_2` FOREIGN KEY (`course_id_fk`) REFERENCES `course_tbl` (`course_id`);

--
-- Constraints for table `exp_tbl`
--
ALTER TABLE `exp_tbl`
  ADD CONSTRAINT `exp_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `fee_tbl`
--
ALTER TABLE `fee_tbl`
  ADD CONSTRAINT `fee_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`),
  ADD CONSTRAINT `fee_tbl_ibfk_2` FOREIGN KEY (`student_id_fk`) REFERENCES `student_tbl` (`std_id`),
  ADD CONSTRAINT `fee_tbl_ibfk_3` FOREIGN KEY (`course_id_fk`) REFERENCES `course_tbl` (`course_id`),
  ADD CONSTRAINT `fee_tbl_ibfk_4` FOREIGN KEY (`batch_id_fk`) REFERENCES `batch_tbl` (`batch_id`);

--
-- Constraints for table `inst_book_tbl`
--
ALTER TABLE `inst_book_tbl`
  ADD CONSTRAINT `inst_book_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`),
  ADD CONSTRAINT `inst_book_tbl_ibfk_2` FOREIGN KEY (`course_id_fk`) REFERENCES `course_tbl` (`course_id`);

--
-- Constraints for table `notification_tbl`
--
ALTER TABLE `notification_tbl`
  ADD CONSTRAINT `notification_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `quiz_tbl`
--
ALTER TABLE `quiz_tbl`
  ADD CONSTRAINT `quiz_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `salary_tbl`
--
ALTER TABLE `salary_tbl`
  ADD CONSTRAINT `salary_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `staff_tbl`
--
ALTER TABLE `staff_tbl`
  ADD CONSTRAINT `staff_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD CONSTRAINT `student_tbl_ibfk_1` FOREIGN KEY (`admin_id_fk`) REFERENCES `admin_tbl` (`admin_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
