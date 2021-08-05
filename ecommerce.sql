-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 05, 2021 at 02:46 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `attribute_id` int(11) NOT NULL,
  `attribute_name` varchar(255) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`attribute_id`, `attribute_name`, `inserted_at`, `updated_at`) VALUES
(6, 'Color', '2021-08-04 07:40:47', '2021-08-04 07:40:47'),
(7, 'Size', '2021-08-04 07:49:40', '2021-08-04 07:49:40');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `parent_id`, `inserted_at`, `updated_at`, `description`) VALUES
(77, 'Shoes', NULL, '2021-08-04 05:08:18', '2021-08-04 05:08:18', ''),
(79, 'Bags', NULL, '2021-08-04 05:34:03', '2021-08-04 05:34:03', '');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `file_name` text NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`file_id`, `file_name`, `mime_type`, `inserted_at`, `size`) VALUES
(308, 'DSC_2394_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 1755198),
(309, 'DSC_2396_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 2258355),
(310, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 2677364),
(311, 'DSC_2393_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 1195263),
(312, 'DSC_2392_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 2115914),
(313, 'DSC_2394.JPG', 'image/jpeg', '2021-07-13 16:45:48', 7610901),
(314, 'DSC_2395.JPG', 'image/jpeg', '2021-07-13 16:45:48', 9036031),
(315, 'DSC_2396.JPG', 'image/jpeg', '2021-07-13 16:45:48', 9533268),
(316, 'DSC_2393.JPG', 'image/jpeg', '2021-07-13 16:45:48', 7638621),
(317, 'DSC_2391_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 1432481),
(318, 'DSC_2389_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 1350276),
(319, 'DSC_2390_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 1751491),
(320, 'DSC_2392.JPG', 'image/jpeg', '2021-07-13 16:45:48', 9586118),
(321, 'DSC_2391.JPG', 'image/jpeg', '2021-07-13 16:45:48', 7816318),
(322, 'DSC_2389.JPG', 'image/jpeg', '2021-07-13 16:45:48', 7851094),
(323, 'DSC_2390.JPG', 'image/jpeg', '2021-07-13 16:45:48', 8317850),
(324, 'DSC_2388_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 4299911),
(325, 'DSC_2387_1.JPG', 'image/jpeg', '2021-07-13 16:45:48', 1609503),
(326, 'DSC_2388.JPG', 'image/jpeg', '2021-07-13 16:45:48', 9471488),
(327, 'DSC_2387.JPG', 'image/jpeg', '2021-07-13 16:45:48', 7772959),
(328, 'DSC_2394_1.JPG', 'image/jpeg', '2021-07-13 18:03:04', 1755198),
(329, 'DSC_2396_1.JPG', 'image/jpeg', '2021-07-13 18:03:04', 2258355),
(330, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-13 18:03:04', 2677364),
(331, 'DSC_2395.JPG', 'image/jpeg', '2021-07-13 18:03:04', 9036031),
(332, 'DSC_2396.JPG', 'image/jpeg', '2021-07-13 18:03:04', 9533268),
(333, 'DSC_2392.JPG', 'image/jpeg', '2021-07-13 18:22:00', 9586118),
(334, 'wallpaperflare.com_wallpaper (1).jpg', 'image/jpeg', '2021-07-13 18:29:23', 80262),
(335, 'wallpaperflare.com_wallpaper.jpg', 'image/jpeg', '2021-07-13 18:47:05', 69727),
(336, 'Screenshot from 2021-02-22 14-24-57.png', 'image/png', '2021-07-13 18:47:05', 148056),
(337, 'tim-zankert-1YFt4rpHKp0-unsplash.jpg', 'image/jpeg', '2021-07-13 18:47:05', 544076),
(338, 'Screenshot from 2021-02-04 18-28-21.png.pdf', 'application/pdf', '2021-07-13 19:44:43', 206142),
(339, 'Screenshot from 2020-05-27 22-49-21.png', 'image/png', '2021-07-13 20:49:47', 701447),
(340, 'Screenshot from 2020-06-15 14-31-10.png', 'image/png', '2021-07-13 20:49:54', 414730),
(341, 'DSC_2394_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 1755198),
(342, 'DSC_2396_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 2258355),
(343, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 2677364),
(344, 'DSC_2394.JPG', 'image/jpeg', '2021-07-13 20:50:14', 7610901),
(345, 'DSC_2395.JPG', 'image/jpeg', '2021-07-13 20:50:14', 9036031),
(346, 'DSC_2396.JPG', 'image/jpeg', '2021-07-13 20:50:14', 9533268),
(347, 'DSC_2393_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 1195263),
(348, 'DSC_2392_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 2115914),
(349, 'DSC_2391_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 1432481),
(350, 'DSC_2390_1.JPG', 'image/jpeg', '2021-07-13 20:50:14', 1751491),
(351, 'DSC_2393.JPG', 'image/jpeg', '2021-07-13 20:50:15', 7638621),
(352, 'DSC_2391.JPG', 'image/jpeg', '2021-07-13 20:50:15', 7816318),
(353, 'DSC_2392.JPG', 'image/jpeg', '2021-07-13 20:50:15', 9586118),
(354, 'DSC_2389_1.JPG', 'image/jpeg', '2021-07-13 20:50:15', 1350276),
(355, 'DSC_2389.JPG', 'image/jpeg', '2021-07-13 20:50:15', 7851094),
(356, 'DSC_2390.JPG', 'image/jpeg', '2021-07-13 20:50:15', 8317850),
(357, 'DSC_2396_1.JPG', 'image/jpeg', '2021-07-14 06:43:11', 2258355),
(358, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-14 06:46:31', 2677364),
(359, 'DSC_2395.JPG', 'image/jpeg', '2021-07-14 06:46:31', 9036031),
(360, 'DSC_2396.JPG', 'image/jpeg', '2021-07-14 06:46:31', 9533268),
(361, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-14 07:38:05', 2677364),
(362, 'DSC_2396_1.JPG', 'image/jpeg', '2021-07-14 07:38:05', 2258355),
(363, 'DSC_2396.JPG', 'image/jpeg', '2021-07-14 07:38:05', 9533268),
(364, 'DSC_2389_1.JPG', 'image/jpeg', '2021-07-14 10:13:11', 1350276),
(365, 'DSC_2390_1.JPG', 'image/jpeg', '2021-07-14 10:13:11', 1751491),
(366, 'DSC_2389.JPG', 'image/jpeg', '2021-07-14 10:13:11', 7851094),
(367, 'DSC_2390.JPG', 'image/jpeg', '2021-07-14 10:13:11', 8317850),
(368, 'DSC_2391_1.JPG', 'image/jpeg', '2021-07-14 10:13:35', 1432481),
(369, 'DSC_2392_1.JPG', 'image/jpeg', '2021-07-14 10:13:35', 2115914),
(370, 'DSC_2391.JPG', 'image/jpeg', '2021-07-14 10:13:35', 7816318),
(371, 'DSC_2392.JPG', 'image/jpeg', '2021-07-14 10:13:35', 9586118),
(372, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-14 15:42:52', 2677364),
(373, 'DSC_2396.JPG', 'image/jpeg', '2021-07-14 15:45:45', 9533268),
(374, 'DSC_2395_1.JPG', 'image/jpeg', '2021-07-14 15:46:55', 2677364),
(375, 'DSC_2395.JPG', 'image/jpeg', '2021-07-14 15:48:36', 9036031),
(376, 'Aggrement of Trainee (2).pdf', 'application/pdf', '2021-07-15 19:44:49', 53447),
(377, 'Aggrement of Trainee.pdf', 'application/pdf', '2021-07-15 19:56:09', 53083),
(378, 'wallpaperflare.com_wallpaper.jpg', 'image/jpeg', '2021-07-17 14:29:27', 69727),
(379, 'wallpaperflare.com_wallpaper (1).jpg', 'image/jpeg', '2021-07-17 14:29:27', 80262),
(380, 'wallpaperflare.com_wallpaper.jpg', 'image/jpeg', '2021-07-17 14:29:27', 69727),
(381, 'Screenshot from 2019-07-04 10-54-40.png', 'image/png', '2021-07-29 09:13:28', 139055),
(382, 'Screenshot from 2019-07-04 11-08-43.png', 'image/png', '2021-07-29 09:13:28', 253776);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  `option_name` varchar(255) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `attribute_id`, `option_name`, `inserted_at`, `updated_at`) VALUES
(1, 7, 'M', '2021-08-04 07:54:49', '2021-08-04 07:54:49'),
(3, 6, 'Red', '2021-08-04 17:32:15', '2021-08-04 17:32:15'),
(4, 6, 'Green', '2021-08-04 17:32:28', '2021-08-04 17:32:28'),
(5, 6, 'Blue', '2021-08-04 17:32:34', '2021-08-04 17:32:34');

-- --------------------------------------------------------

--
-- Table structure for table `prduct_inventory`
--

CREATE TABLE `prduct_inventory` (
  `inventory_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `inventory_status` enum('In Stock','Out Of Stock') NOT NULL,
  `quantity` int(11) NOT NULL,
  `stock_threshold` int(11) DEFAULT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prduct_inventory`
--

INSERT INTO `prduct_inventory` (`inventory_id`, `product_id`, `inventory_status`, `quantity`, `stock_threshold`, `inserted_at`, `updated_at`) VALUES
(1, 75, 'In Stock', 12, NULL, '2021-08-04 20:41:09', '2021-08-04 20:41:09'),
(2, 87, 'In Stock', 3, NULL, '2021-08-04 20:46:57', '2021-08-04 20:46:57'),
(3, 88, 'In Stock', 1, NULL, '2021-08-04 20:46:57', '2021-08-04 20:46:57'),
(4, 89, 'In Stock', 12, NULL, '2021-08-04 20:55:24', '2021-08-04 20:55:24'),
(5, 90, 'In Stock', 12, NULL, '2021-08-04 20:55:44', '2021-08-04 20:55:44'),
(6, 91, 'In Stock', 12, NULL, '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(7, 92, 'In Stock', 3, NULL, '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(8, 93, 'In Stock', 1, NULL, '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(9, 94, 'In Stock', 12, NULL, '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(10, 95, 'In Stock', 3, NULL, '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(11, 96, 'In Stock', 1, NULL, '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(12, 97, 'In Stock', 12, NULL, '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(13, 98, 'In Stock', 3, NULL, '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(14, 99, 'In Stock', 1, NULL, '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(15, 100, 'In Stock', 12, NULL, '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(16, 101, 'In Stock', 3, NULL, '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(17, 102, 'In Stock', 1, NULL, '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(18, 104, 'In Stock', 12, NULL, '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(19, 105, 'In Stock', 3, NULL, '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(20, 106, 'In Stock', 1, NULL, '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(21, 107, 'In Stock', 12, NULL, '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(22, 108, 'In Stock', 3, NULL, '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(23, 109, 'In Stock', 1, NULL, '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(24, 110, 'In Stock', 12, NULL, '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(25, 111, 'In Stock', 3, NULL, '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(26, 112, 'In Stock', 1, NULL, '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(27, 113, 'In Stock', 12, NULL, '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(28, 114, 'In Stock', 3, NULL, '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(29, 115, 'In Stock', 1, NULL, '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(30, 116, 'In Stock', 12, NULL, '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(31, 117, 'In Stock', 3, NULL, '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(32, 118, 'In Stock', 1, NULL, '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(33, 119, 'In Stock', 12, NULL, '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(34, 120, 'In Stock', 3, NULL, '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(35, 121, 'In Stock', 1, NULL, '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(36, 122, 'In Stock', 12, NULL, '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(37, 123, 'In Stock', 3, NULL, '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(38, 124, 'In Stock', 1, NULL, '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(39, 125, 'In Stock', 12, NULL, '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(40, 126, 'In Stock', 3, NULL, '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(41, 127, 'In Stock', 1, NULL, '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(42, 128, 'In Stock', 12, NULL, '2021-08-05 11:30:17', '2021-08-05 11:30:17'),
(43, 129, 'In Stock', 3, NULL, '2021-08-05 11:30:17', '2021-08-05 11:30:17'),
(44, 130, 'In Stock', 1, NULL, '2021-08-05 11:30:17', '2021-08-05 11:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `sku` varchar(255) NOT NULL,
  `product_status_id` int(11) DEFAULT NULL,
  `view_on_website` tinyint(1) NOT NULL DEFAULT '0',
  `featured_product` tinyint(1) NOT NULL DEFAULT '0',
  `popular_product` tinyint(1) NOT NULL DEFAULT '0',
  `isTaxable` tinyint(1) NOT NULL DEFAULT '1',
  `isDisableDiscount` tinyint(1) NOT NULL DEFAULT '0',
  `featured_img` text,
  `regular_price` decimal(10,0) NOT NULL,
  `discount_price` decimal(10,0) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `inserted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `parent_id`, `sku`, `product_status_id`, `view_on_website`, `featured_product`, `popular_product`, `isTaxable`, `isDisableDiscount`, `featured_img`, `regular_price`, `discount_price`, `updated_at`, `inserted_at`) VALUES
(51, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:14:16', '2021-08-04 20:14:16'),
(52, 51, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:14:16', '2021-08-04 20:14:16'),
(53, 51, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:14:16', '2021-08-04 20:14:16'),
(54, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:17:49', '2021-08-04 20:17:49'),
(55, 54, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:17:49', '2021-08-04 20:17:49'),
(56, 54, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:17:49', '2021-08-04 20:17:49'),
(57, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:18:25', '2021-08-04 20:18:25'),
(58, 57, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:18:25', '2021-08-04 20:18:25'),
(59, 57, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:18:25', '2021-08-04 20:18:25'),
(60, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:19:10', '2021-08-04 20:19:10'),
(61, 60, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:19:10', '2021-08-04 20:19:10'),
(62, 60, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:19:10', '2021-08-04 20:19:10'),
(63, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:20:00', '2021-08-04 20:20:00'),
(64, 63, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:20:00', '2021-08-04 20:20:00'),
(65, 63, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:20:00', '2021-08-04 20:20:00'),
(66, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:25:08', '2021-08-04 20:25:08'),
(67, 66, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:25:08', '2021-08-04 20:25:08'),
(68, 66, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:25:08', '2021-08-04 20:25:08'),
(69, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:31:37', '2021-08-04 20:31:37'),
(70, 69, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:31:37', '2021-08-04 20:31:37'),
(71, 69, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:31:37', '2021-08-04 20:31:37'),
(72, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:32:25', '2021-08-04 20:32:25'),
(73, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:39:17', '2021-08-04 20:39:17'),
(74, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:40:41', '2021-08-04 20:40:41'),
(75, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:41:09', '2021-08-04 20:41:09'),
(76, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:45:07', '2021-08-04 20:45:07'),
(77, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:45:21', '2021-08-04 20:45:21'),
(78, 77, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:45:21', '2021-08-04 20:45:21'),
(79, 77, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:45:21', '2021-08-04 20:45:21'),
(80, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:45:52', '2021-08-04 20:45:52'),
(81, 80, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:45:52', '2021-08-04 20:45:52'),
(82, 80, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:45:52', '2021-08-04 20:45:52'),
(83, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:46:19', '2021-08-04 20:46:19'),
(84, 83, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:46:19', '2021-08-04 20:46:19'),
(85, 83, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:46:19', '2021-08-04 20:46:19'),
(86, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:46:57', '2021-08-04 20:46:57'),
(87, 86, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:46:57', '2021-08-04 20:46:57'),
(88, 86, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:46:57', '2021-08-04 20:46:57'),
(89, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:55:24', '2021-08-04 20:55:24'),
(90, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:55:44', '2021-08-04 20:55:44'),
(91, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(92, 91, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(93, 91, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(94, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(95, 94, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(96, 94, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(97, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(98, 97, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(99, 97, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(100, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(101, 100, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(102, 100, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(103, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 21:07:29', '2021-08-04 21:07:29'),
(104, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(105, 104, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(106, 104, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(107, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(108, 107, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(109, 107, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(110, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(111, 110, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(112, 110, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(113, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(114, 113, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(115, 113, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(116, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(117, 116, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(118, 116, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(119, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(120, 119, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(121, 119, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(122, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(123, 122, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(124, 122, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(125, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(126, 125, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(127, 125, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(128, NULL, 'WTCH-GR-GD2', 1, 1, 1, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:30:17', '2021-08-05 11:30:17'),
(129, 128, 'WTCH-GR-GD2', NULL, 0, 0, 0, 0, 0, NULL, '1990', '1200', '2021-08-05 11:30:17', '2021-08-05 11:30:17'),
(130, 128, 'WTCH-GB-GD1', NULL, 0, 0, 0, 0, 0, NULL, '1900', '1100', '2021-08-05 11:30:17', '2021-08-05 11:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute`
--

CREATE TABLE `product_attribute` (
  `product_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_attribute`
--

INSERT INTO `product_attribute` (`product_id`, `attribute_id`) VALUES
(89, 6),
(89, 7),
(90, 6),
(90, 7),
(91, 6),
(91, 7),
(94, 6),
(94, 7),
(97, 6),
(97, 7),
(100, 6),
(100, 7),
(104, 6),
(104, 7),
(107, 6),
(107, 7),
(110, 6),
(110, 7),
(113, 6),
(113, 7),
(116, 6),
(116, 7),
(119, 6),
(119, 7),
(122, 6),
(122, 7),
(125, 6),
(125, 7),
(128, 6),
(128, 7);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `category_id`, `product_id`, `inserted_at`, `updated_at`) VALUES
(16, 77, 89, '2021-08-04 20:55:24', '2021-08-04 20:55:24'),
(17, 79, 89, '2021-08-04 20:55:24', '2021-08-04 20:55:24'),
(18, 77, 90, '2021-08-04 20:55:44', '2021-08-04 20:55:44'),
(19, 79, 90, '2021-08-04 20:55:44', '2021-08-04 20:55:44'),
(20, 77, 91, '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(21, 79, 91, '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(22, 77, 94, '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(23, 79, 94, '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(24, 77, 97, '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(25, 79, 97, '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(26, 77, 100, '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(27, 79, 100, '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(28, 77, 103, '2021-08-04 21:07:29', '2021-08-04 21:07:29'),
(29, 79, 103, '2021-08-04 21:07:29', '2021-08-04 21:07:29'),
(30, 77, 104, '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(31, 79, 104, '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(32, 77, 107, '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(33, 79, 107, '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(34, 77, 110, '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(35, 79, 110, '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(36, 77, 113, '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(37, 79, 113, '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(38, 77, 116, '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(39, 79, 116, '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(40, 77, 119, '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(41, 79, 119, '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(42, 77, 122, '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(43, 79, 122, '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(44, 77, 125, '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(45, 79, 125, '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(46, 77, 128, '2021-08-05 11:30:17', '2021-08-05 11:30:17'),
(47, 79, 128, '2021-08-05 11:30:17', '2021-08-05 11:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `product_charges`
--

CREATE TABLE `product_charges` (
  `chages_id` int(11) NOT NULL,
  `charge_type` enum('Tax','Shipping') NOT NULL,
  `charge_amount` int(11) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `short_description` text,
  `long_description` text,
  `product_gallery` text,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`product_id`, `product_name`, `short_description`, `long_description`, `product_gallery`, `inserted_at`, `updated_at`) VALUES
(30, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 19:39:05', '2021-08-04 19:39:05'),
(89, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 20:55:24', '2021-08-04 20:55:24'),
(90, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 20:55:44', '2021-08-04 20:55:44'),
(91, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 20:57:42', '2021-08-04 20:57:42'),
(94, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 20:58:14', '2021-08-04 20:58:14'),
(97, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 20:58:36', '2021-08-04 20:58:36'),
(100, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 21:03:46', '2021-08-04 21:03:46'),
(104, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-04 21:08:00', '2021-08-04 21:08:00'),
(107, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 05:57:44', '2021-08-05 05:57:44'),
(110, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 10:09:18', '2021-08-05 10:09:18'),
(113, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 11:00:32', '2021-08-05 11:00:32'),
(116, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 11:29:00', '2021-08-05 11:29:00'),
(119, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 11:29:19', '2021-08-05 11:29:19'),
(122, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 11:30:14', '2021-08-05 11:30:14'),
(125, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 11:30:15', '2021-08-05 11:30:15'),
(128, 'Watch Golden', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lacus non ultricies feugiat. Cras a urna at lorem maximus tempor. In hac habitasse platea dictumst. Duis quis sapien pretium, eleifend quam sit amet, molestie sem. In hac habitasse platea dictumst. Nam ultricies ac leo vel ultricies. Duis eget lacinia nulla, vitae viverra eros. Sed finibus erat quis tristique lacinia. Nullam quis porttitor nulla, ac auctor mi. Aliquam erat volutpat. Vestibulum sed cursus risus, sed ultrices nunc. Fusce sed mi auctor, consectetur est non, efficitur augue. Sed at pellentesque orci. Mauris turpis libero, viverra ut nisi vel, commodo viverra nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', NULL, '2021-08-05 11:30:17', '2021-08-05 11:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `product_review_id` int(11) NOT NULL,
  `ratings` decimal(10,0) NOT NULL,
  `comment` text NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_status`
--

CREATE TABLE `product_status` (
  `product_status_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_status`
--

INSERT INTO `product_status` (`product_status_id`, `name`, `inserted_at`, `updated_at`) VALUES
(1, 'Published', '2021-07-09 08:58:51', '2021-07-09 08:58:51'),
(2, 'Draft', '2021-07-09 08:58:52', '2021-07-09 08:58:52'),
(3, 'UnPublished', '2021-07-09 08:59:10', '2021-07-09 08:59:10'),
(4, 'Pending', '2021-07-09 08:59:23', '2021-07-09 08:59:23');

-- --------------------------------------------------------

--
-- Table structure for table `product_tags`
--

CREATE TABLE `product_tags` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `product_variant_id` int(11) NOT NULL,
  `product_variant_combinations` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`product_variant_id`, `product_variant_combinations`) VALUES
(64, '13'),
(65, '15'),
(67, '13'),
(68, '15'),
(70, '13'),
(71, '15'),
(92, '13'),
(93, '15'),
(95, '13'),
(96, '15'),
(98, '13'),
(99, '15'),
(101, '13'),
(102, '15'),
(105, '13'),
(106, '15'),
(108, '13'),
(109, '15'),
(111, '13'),
(112, '15'),
(114, '13'),
(115, '15'),
(117, '13'),
(118, '15'),
(120, '13'),
(121, '15'),
(123, '13'),
(124, '15'),
(126, '13'),
(127, '15'),
(129, '13'),
(130, '15');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`attribute_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`);

--
-- Indexes for table `prduct_inventory`
--
ALTER TABLE `prduct_inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_attribute`
--
ALTER TABLE `product_attribute`
  ADD PRIMARY KEY (`product_id`,`attribute_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`product_review_id`);

--
-- Indexes for table `product_status`
--
ALTER TABLE `product_status`
  ADD PRIMARY KEY (`product_status_id`);

--
-- Indexes for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`product_variant_id`,`product_variant_combinations`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=383;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `prduct_inventory`
--
ALTER TABLE `prduct_inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `product_review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_status`
--
ALTER TABLE `product_status`
  MODIFY `product_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_tags`
--
ALTER TABLE `product_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
