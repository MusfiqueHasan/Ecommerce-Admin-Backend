-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2021 at 08:02 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_jwt`
--

-- --------------------------------------------------------

--
-- Table structure for table `orderdata`
--

CREATE TABLE `orderdata` (
  `id` int(11) NOT NULL,
  `user_fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_data` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_status` int(3) DEFAULT NULL,
  `pay_option` int(3) DEFAULT NULL,
  `pay_medium` int(3) DEFAULT NULL,
  `pay_phoneNumber` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseNo` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landmark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_price` decimal(10,0) DEFAULT NULL,
  `shipping_cost` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderdata`
--

INSERT INTO `orderdata` (`id`, `user_fullname`, `user_email`, `productId`, `order_data`, `order_status`, `pay_option`, `pay_medium`, `pay_phoneNumber`, `transactionId`, `message`, `division`, `city`, `houseNo`, `landmark`, `postCode`, `phonenumber`, `total_price`, `shipping_cost`) VALUES
(1, 'akram nakib', 'nakib@gmaill.com', '[10,10,20]', '2021-08-20 10:53:11', 0, 1, 1, '017102321', NULL, 'order', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'akram nakib', 'nakib@gmaill.com', '[10,10,20]', '2021-08-20 10:54:17', 0, 1, 1, '017102321', 'dfadfa', 'order', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:29:40', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(4, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:30:50', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(5, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:47:26', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(6, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:48:43', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(7, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:50:26', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(8, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:50:27', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(9, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 13:51:51', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(10, '', 'nakib@gmail.com', '[27,21,26,25,23]', '2021-08-20 15:13:16', 0, 1, 1, '', '', '', '', '', '', NULL, '', '', NULL, NULL),
(11, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 15:19:21', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', NULL, NULL),
(12, 'nakib', 'nakib@gmail.com', '[1,2]', '2021-08-20 15:21:44', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', '1200', '30'),
(13, 'nakib', 'nakib@gmail.com', '[27,21,26,25,23]', '2021-08-20 15:47:48', 0, 2, 2, '01710203288', 'qweqwwqew', '', 'Dhaka', 'Dhaka', '13AA', NULL, '1234', '21313', '30', '30'),
(14, 'nakib', 'nakib@gmail.com', '[27,21,26,25,23]', '2021-08-20 15:49:51', 0, 2, 2, '1231313', '13213', '', 'dhaka', 'dhaka', '123444', NULL, '1234', '012312313', '30', '30'),
(15, 'nakib', 'nakib2@gmail.com', '[1,2]', '2021-08-20 17:48:27', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', '1200', '30'),
(16, 'nakib', 'nakib2@gmail.com', '[1,2]', '2021-08-20 17:48:28', 0, 1, 1, '01323131', 'afdwad', 'order', 'dhaka', 'dhaka', '12A', 'uttara', '1230', '017120321', '1200', '30');

-- --------------------------------------------------------

--
-- Table structure for table `orderedproduct`
--

CREATE TABLE `orderedproduct` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variants` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `status` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderedproduct`
--

INSERT INTO `orderedproduct` (`id`, `orderId`, `productId`, `product_name`, `variants`, `qty`, `price`, `status`) VALUES
(1, 1, 1, 'apple2', '[xl,red]', 2, '200', 0),
(2, 6, 1, 'apple watchA', '', 2, '320', 0),
(3, 6, 2, 'apple watchB', '', 2, '320', 0),
(4, 7, 2, 'apple watchB', '', 2, '320', 0),
(5, 7, 1, 'apple watchA', '', 2, '320', 0),
(6, 8, 2, 'apple watchB', '', 2, '320', 0),
(7, 8, 1, 'apple watchA', '', 2, '320', 0),
(8, 9, 1, 'apple watchA', '[l,red]', 2, '320', 0),
(9, 9, 2, 'apple watchB', '', 2, '320', 0),
(10, 10, 27, 'Apple Watch Series 5', '', 1, '340', 0),
(11, 10, 21, 'Google - Google Home - White/Slate fabric', '', 1, '129', 0),
(12, 10, 26, 'Apple iPhone 11 (64GB, Black)', '', 1, '670', 0),
(13, 10, 23, 'Apple - MacBook Air® (Latest Model) - 13.3\" Display - Silver', '', 1, '1000', 0),
(14, 10, 25, 'Apple iMac 27-inch', '', 1, '1000', 0),
(15, 11, 1, 'apple watchA', '[l,red]', 2, '320', 0),
(16, 11, 2, 'apple watchB', '', 2, '320', 0),
(17, 12, 1, 'apple watchA', '[l,red]', 2, '320', 0),
(18, 12, 2, 'apple watchB', '', 2, '320', 0),
(19, 13, 21, 'Google - Google Home - White/Slate fabric', '', 1, '129', 0),
(20, 13, 27, 'Apple Watch Series 5', '', 1, '340', 0),
(21, 13, 26, 'Apple iPhone 11 (64GB, Black)', '', 1, '670', 0),
(22, 13, 25, 'Apple iMac 27-inch', '', 1, '1000', 0),
(23, 13, 23, 'Apple - MacBook Air® (Latest Model) - 13.3\" Display - Silver', '', 1, '1000', 0),
(24, 14, 23, 'Apple - MacBook Air® (Latest Model) - 13.3\" Display - Silver', '', 1, '1000', 0),
(25, 14, 27, 'Apple Watch Series 5', '', 1, '340', 0),
(26, 14, 21, 'Google - Google Home - White/Slate fabric', '', 1, '129', 0),
(27, 14, 26, 'Apple iPhone 11 (64GB, Black)', '', 1, '670', 0),
(28, 14, 25, 'Apple iMac 27-inch', '', 1, '1000', 0),
(29, 15, 1, 'apple watchA', '[l,red]', 2, '320', 0),
(30, 15, 2, 'apple watchB', '', 2, '320', 0),
(31, 16, 2, 'apple watchB', '', 2, '320', 0),
(32, 16, 1, 'apple watchA', '[l,red]', 2, '320', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_date` timestamp NULL DEFAULT NULL,
  `profile_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `first_name`, `last_name`, `user_name`, `email`, `phone_number`, `address`, `password`, `created_date`, `updated_date`, `profile_img`) VALUES
(1, 'nakib', NULL, NULL, 'nakibgoku@gmail.com', '01710203288', NULL, 'dafdf', '2021-08-15 08:57:25', NULL, NULL),
(2, 'nakib', NULL, NULL, 'user35@gmail.com', '01711203288', NULL, '$2b$10$mLOb4Wb8PG8Je2VWhVGJ7OFkYgU67En.HI6Cl4P0JhIfmO8jjm3ne', '2021-08-15 09:19:40', NULL, NULL),
(3, 'nakib', NULL, NULL, 'nakib@gmail.com', '01722203288', NULL, '$2b$10$g1PIm9ZzZLNonqsdQ/dF/ON.z8iNtrqcHCCJwWA4/ajWZluUYf0Na', '2021-08-15 09:49:34', NULL, NULL),
(4, 'nakib', NULL, NULL, 'nakib1@gmail.com', '01721203288', NULL, '$2b$10$0t9zmXvVBBNMFMGVHvUf.uHd.vR7O9/HQRMmgcqLci23Ld1LuRLVC', '2021-08-15 09:51:27', NULL, NULL),
(5, 'nakib', NULL, NULL, 'nakib2@gmail.com', '01731203288', NULL, '$2b$10$veQu/WgvPyLNUMvSRMJhFexUbd0xQUusQB0BWQ50lq7f0zRjfpDdG', '2021-08-15 10:03:57', NULL, NULL),
(6, 'nakib', NULL, NULL, 'nakib6@gmail.com', '01910203288', NULL, '$2b$10$bkgTfhw.uOx2QRKtdFgx6u5eKLIrJrMCcek.dfMtbzof4CfOdOpNu', '2021-08-15 13:25:13', NULL, NULL),
(7, 'nakib', NULL, NULL, 'nakib11@gmail.com', '01911203288', NULL, '$2b$10$8b/wcVZl.G0RLpm2eTuOBuqKTu.nmtHb7QpcmtqBvEDNLwn1jRw5S', '2021-08-15 13:56:52', NULL, NULL),
(8, 'nakib', NULL, NULL, 'nakib14@gmail.com', '01720221088', NULL, '$2b$10$A0QizEx1a6zfW6rCv6Wg5uhZW16cHFiW7l1N5PL6y9yJsgTXBQd2.', '2021-08-15 15:24:26', NULL, NULL),
(9, 'nakib', NULL, NULL, 'nakib15@gmail.com', '01723221088', NULL, '$2b$10$kaXvW6PULK7Kh2FGk72ZFOaK2wCsUP80HP.pItNeFo.S/pOplC56G', '2021-08-15 17:00:01', NULL, NULL),
(10, 'nakib', NULL, NULL, 'nakib16@gmail.com', '01724221088', NULL, '$2b$10$gv82ZUmh4sPAniwMUyImL.lKZWahnhTdjFbgd4KAp7AR9txNkzdnm', '2021-08-15 17:05:38', NULL, NULL),
(11, 'nakib', NULL, NULL, 'nakib17@gmail.com', '01711223288', NULL, '$2b$10$9k/IzMPjIdbMAwQB709l3O0qY0oqISCZRNxS32g2Q61IPElyzz5d6', '2021-08-15 17:06:22', NULL, NULL),
(12, 'nakib', NULL, NULL, 'nakib20@gmail.com', '01311203288', NULL, '$2b$10$DjvAT9bQUFXSzvTLjwthd.XGKBKabROzWFm1pzE9lWcpCrQ5FVvxC', '2021-08-15 18:02:48', NULL, NULL),
(13, 'kib', NULL, NULL, 'nakib32@gmail.com', '01719223288', NULL, '$2b$10$q1ng8Ho3X9iepqX6lqP88eqP71dX3pqIrXaQAjW2mLJQZrsHSA9yO', '2021-08-15 20:41:49', NULL, NULL),
(14, 'nakib', NULL, NULL, 'nakib33@gmail.com', '01741223288', NULL, '$2b$10$qiQi8fG2R1qSMm7oQOGnm.gTLkwQ4tHMntv1HLC1EnPSMIQJLJzLO', '2021-08-15 20:45:11', NULL, NULL),
(15, 'naki', NULL, NULL, 'nakib90@gmail.com', '01711823288', NULL, '$2b$10$C5TG85icdS9Lz8.hr/xgKuocv4PiXZkhwnPEVrFor1pPd5AmwaCdG', '2021-08-16 14:00:10', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderdata`
--
ALTER TABLE `orderdata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderedproduct`
--
ALTER TABLE `orderedproduct`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderdata`
--
ALTER TABLE `orderdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orderedproduct`
--
ALTER TABLE `orderedproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
