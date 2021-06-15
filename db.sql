-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 15, 2021 at 10:03 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `indexing` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `price`, `quantity`, `category`, `indexing`) VALUES
(3, 'Blue shir', 'a cool blue shirt. :)', 'download.png', 16000, 8, 2, 'BL XRT A KL BL XRT'),
(12, 'Pant', 'a cool pant to wear with your homies :)', 'micka$guillene.jpeg', 21000, 10, 2, 'PNT A KL PNT T WR W0 YR HMS  '),
(13, 'shirt', 'a cool shirt', '', 10000, 10, 3, 'XRT A KL XRT '),
(14, 'Short', 'A cool blue short', '', 15000, 9, 2, 'XRT A KL BL XRT '),
(15, 'Blue shirt', 'a cool blue shirt to wear in your homies and look cool', '', 10000, 10, 3, 'BL XRT A KL BL XRT '),
(16, 'Timber Land', 'A cool brown shoe', '', 40000, 4, 4, 'TMR LNT A KL BRN X '),
(17, 'Godas', 'A balck shoe', '', 12000, 7, 4, 'KTS A BLK X '),
(18, 'Mukeke sombe', 'A sombe with ndagala', '', 20000, 23, 1, 'MKK SM A SM W0 NTKL ');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `delivered` date NOT NULL,
  `user` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `shipping_address` text NOT NULL,
  `category` int(11) NOT NULL,
  `reduction` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `date`, `delivered`, `user`, `product_id`, `product_name`, `description`, `price`, `quantity`, `shipping_address`, `category`, `reduction`, `total`, `status`) VALUES
(1, '2020-08-19', '2021-02-27', 1, 16, 'Timber Land', 'A cool brown shoe', 40000, 1, '-3.365185525550096,29.392847947611514', 4, 0, 40000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `uniqueID` text NOT NULL,
  `tel` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `image` text NOT NULL,
  `home_address` text NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `uniqueID`, `tel`, `email`, `password`, `image`, `home_address`, `type`) VALUES
(1, 'Patrick Igiraneza', '5f186723cb7ac7.82727389', '123455', 'igiranezapatrick31@gmail.com', '$2y$10$T1ubi1xcq8Qj0Qnf/WfCQONlBCmVPkbpMKM1dN5jXERY.BUbB9.4W', 'patrick1.jpeg', '45.4677,-75.5399', 1),
(2, 'Patrick', '5f0b4114718327.32716502', '123423', 'admin@gmail.com', '$2y$10$9ad/ZT5zMt3hzVyIfgD8ZuR22ESKPtgp.40I6/WM7Gf9QgvNhwtS6', 'patrick1.jpeg', '', 0),
(3, 'teacher', '60c8f6812b2449.75345408', '123456', 'teacher@gmail.com', '$2y$10$3Ip9CvV0ryDSMxveFIgmg.zb8/MxjVCEIgqFZbEjyKOT1OKufe6s.', '', '45.4677,-75.5399', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
