-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.10.20
-- Generation Time: Jan 05, 2026 at 05:06 PM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `allatkert`
--

-- --------------------------------------------------------

--
-- Table structure for table `allatok`
--

CREATE TABLE `allatok` (
  `allat_id` int(11) NOT NULL,
  `nev` varchar(50) DEFAULT NULL,
  `faj` varchar(50) DEFAULT NULL,
  `szuletesi_datum` date DEFAULT NULL,
  `nem` varchar(10) DEFAULT NULL,
  `kifuto` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allatok`
--

INSERT INTO `allatok` (`allat_id`, `nev`, `faj`, `szuletesi_datum`, `nem`, `kifuto`) VALUES
(1, 'Szimba', 'Oroszlán', '1994-12-01', 'Hím', 'Nagymacska kifutó'),
(2, 'Dumbó', 'Elefánt', '1992-01-25', 'Nőstény', 'Elefánt kifutó'),
(3, 'Momo', 'Makákó', '2005-02-25', 'Hím', 'Majomház'),
(4, 'Alex', 'Zsiráf', '2006-05-15', 'Nőstény', 'Szavanna kifutó'),
(5, 'Mei', 'Vörös Panda', '2022-03-11', 'Nőstény', 'Panda kifutó'),
(6, 'Nemo', 'Bohóchal', '2003-10-15', 'Hím', 'Akvárium');

-- --------------------------------------------------------

--
-- Table structure for table `dolgozok`
--

CREATE TABLE `dolgozok` (
  `dolgozo_id` int(11) NOT NULL,
  `nev` varchar(50) DEFAULT NULL,
  `beosztas` varchar(50) DEFAULT NULL,
  `telefonszam` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dolgozok`
--

INSERT INTO `dolgozok` (`dolgozo_id`, `nev`, `beosztas`, `telefonszam`) VALUES
(1, 'Kis Pista', 'Állatgondozó', '06201234567'),
(2, 'Nagy János', 'Állatorvosi asszisztens', '06301234567'),
(3, 'Közepes László', 'Állatgondozó', '06501234567'),
(4, 'Suha Alex', 'Zsiráfgondozó', '06306150505'),
(5, 'Kis Ádám', 'Biztonsági őr', '06202658051'),
(6, 'Bárány Máté', 'Biztonsági őr', '06201115555');

-- --------------------------------------------------------

--
-- Table structure for table `ellatasok`
--

CREATE TABLE `ellatasok` (
  `ellatas_id` int(11) NOT NULL,
  `allat_id` int(11) DEFAULT NULL,
  `gondozó_id` int(11) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `tipus` varchar(50) DEFAULT NULL,
  `megjegyzes` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ellatasok`
--

INSERT INTO `ellatasok` (`ellatas_id`, `allat_id`, `gondozó_id`, `datum`, `tipus`, `megjegyzes`) VALUES
(1, 1, 1, '2026-01-05', 'Gyógyszeres kezelés', 'Vitamin beadása'),
(2, 2, 2, '2026-01-06', 'Orvosi vizsgálat', 'Általános állapotfelmérés'),
(3, 3, 3, '2026-01-07', 'Gyógyszeres kezelés', 'Féreghajtás');

-- --------------------------------------------------------

--
-- Table structure for table `ellatas_gyogyszer`
--

CREATE TABLE `ellatas_gyogyszer` (
  `ellatas_id` int(11) NOT NULL,
  `gyogyszer_id` int(11) NOT NULL,
  `adagolas` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ellatas_gyogyszer`
--

INSERT INTO `ellatas_gyogyszer` (`ellatas_id`, `gyogyszer_id`, `adagolas`) VALUES
(1, 1, '5 ml'),
(3, 2, '1 tabletta');

-- --------------------------------------------------------

--
-- Table structure for table `gyogyszerek`
--

CREATE TABLE `gyogyszerek` (
  `gyogyszer_id` int(11) NOT NULL,
  `nev` varchar(50) DEFAULT NULL,
  `leiras` text DEFAULT NULL,
  `mennyiseg` int(11) DEFAULT NULL,
  `lejárati_datum` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gyogyszerek`
--

INSERT INTO `gyogyszerek` (`gyogyszer_id`, `nev`, `leiras`, `mennyiseg`, `lejárati_datum`) VALUES
(1, 'Vitamin injekció', 'Általános erősítő készítmény', 20, '2026-12-31'),
(2, 'Féreghajtó', 'Belső élősködők ellen', 15, '2025-08-15'),
(3, 'Antibiotikum', 'Fertőzések kezelésére', 10, '2025-11-30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allatok`
--
ALTER TABLE `allatok`
  ADD PRIMARY KEY (`allat_id`);

--
-- Indexes for table `dolgozok`
--
ALTER TABLE `dolgozok`
  ADD PRIMARY KEY (`dolgozo_id`);

--
-- Indexes for table `ellatasok`
--
ALTER TABLE `ellatasok`
  ADD PRIMARY KEY (`ellatas_id`),
  ADD KEY `allat_id` (`allat_id`),
  ADD KEY `gondozó_id` (`gondozó_id`);

--
-- Indexes for table `ellatas_gyogyszer`
--
ALTER TABLE `ellatas_gyogyszer`
  ADD PRIMARY KEY (`ellatas_id`,`gyogyszer_id`),
  ADD KEY `gyogyszer_id` (`gyogyszer_id`);

--
-- Indexes for table `gyogyszerek`
--
ALTER TABLE `gyogyszerek`
  ADD PRIMARY KEY (`gyogyszer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allatok`
--
ALTER TABLE `allatok`
  MODIFY `allat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dolgozok`
--
ALTER TABLE `dolgozok`
  MODIFY `dolgozo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ellatasok`
--
ALTER TABLE `ellatasok`
  MODIFY `ellatas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gyogyszerek`
--
ALTER TABLE `gyogyszerek`
  MODIFY `gyogyszer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
