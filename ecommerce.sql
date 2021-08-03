-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 03, 2021 at 08:40 PM
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
(76, 'Bags', NULL, '2021-07-15 19:41:08', '2021-07-15 19:41:08', '');

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

-- --------------------------------------------------------

--
-- Table structure for table `prduct_inventory`
--

CREATE TABLE `prduct_inventory` (
  `inventory_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `product_status_id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `regular_price` decimal(10,0) NOT NULL,
  `discount_price` decimal(10,0) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `view_on_website` tinyint(1) NOT NULL,
  `featured_img` text,
  `featured_product` tinyint(1) NOT NULL DEFAULT '0',
  `popular_product` tinyint(1) NOT NULL DEFAULT '0',
  `hasFreeShipping` tinyint(1) NOT NULL,
  `isTaxable` tinyint(1) NOT NULL DEFAULT '0',
  `isDisableDiscount` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute`
--

CREATE TABLE `product_attribute` (
  `product_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(11, 76, 23, '2021-07-17 14:30:26', '2021-07-17 14:30:26'),
(12, 76, 24, '2021-07-17 14:42:20', '2021-07-17 14:42:20'),
(13, 76, 25, '2021-07-29 09:14:12', '2021-07-29 09:14:12');

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
  `short_description` text NOT NULL,
  `long_description` text NOT NULL,
  `product_gallery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

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
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=383;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prduct_inventory`
--
ALTER TABLE `prduct_inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
