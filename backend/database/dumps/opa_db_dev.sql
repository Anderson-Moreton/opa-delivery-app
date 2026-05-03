-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 29-Ago-2022 às 21:13
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `opa_db_dev`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Burguer', '2022-06-18 18:38:38', '2022-06-18 18:38:38'),
(2, 'Dog', '2022-06-23 03:09:54', '2022-06-23 03:09:54'),
(3, 'Drink', '2022-06-23 03:12:22', '2022-06-23 03:12:22'),
(4, 'Combo', '2022-06-23 03:12:22', '2022-06-23 03:12:22');

-- --------------------------------------------------------

--
-- Estrutura da tabela `OrderItems`
--

CREATE TABLE `OrderItems` (
  `id` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `OrderItems`
--

INSERT INTO `OrderItems` (`id`, `orderId`, `productId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(55, 22, 2, 1, '2022-08-29 14:28:19', '2022-08-29 14:28:19'),
(56, 22, 11, 1, '2022-08-29 14:28:19', '2022-08-29 14:28:19'),
(57, 22, 5, 1, '2022-08-29 14:28:19', '2022-08-29 14:28:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) NOT NULL,
  `cliente` varchar(255) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `Orders`
--

INSERT INTO `Orders` (`id`, `cliente`, `total`, `createdAt`, `updatedAt`) VALUES
(22, 'rafael@teste.com', 59.89, '2022-08-29 14:28:19', '2022-08-29 14:28:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `illustration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `Products`
--

INSERT INTO `Products` (`id`, `name`, `categoryId`, `price`, `illustration`, `createdAt`, `updatedAt`) VALUES
(1, 'X-Burguer', 1, 25.6, '/img/burguer02.jpg', '2022-06-18 18:39:30', '2022-06-18 18:39:30'),
(2, 'Mega Burguer', 1, 32.6, '/img/burguer03.jpg', '2022-06-23 00:23:33', '2022-06-23 00:23:33'),
(3, 'Top Burguer', 1, 22.6, '/img/burguer05.jpg', '2022-06-23 00:24:44', '2022-06-23 00:24:44'),
(4, 'Dogão Opa', 2, 12.5, '/img/dogMega.jpeg', '2022-06-23 01:27:15', '2022-06-23 01:27:15'),
(5, 'Dogão Master', 2, 18.5, '/img/dogCompleto.jpeg', '2022-06-23 01:28:45', '2022-06-23 01:28:45'),
(6, 'Coca Cola 500 ml', 3, 6.9, '/img/cocaLata.jpeg', '2022-06-23 01:31:00', '2022-06-23 01:31:00'),
(11, 'Antártica 500 ml', 3, 8.79, '/img/guaranaLata.jpeg', '2022-08-29 15:54:37', '2022-08-29 15:54:37'),
(12, 'Chopp 250 ml', 3, 12.38, '/img/bebidas.jpg', '2022-08-29 15:54:37', '2022-08-29 15:54:37'),
(13, 'Dog do OPA', 2, 13.87, '/img/dogBacon.jpeg', '2022-08-29 15:56:15', '2022-08-29 15:56:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('1-initial-migration.js');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Índices para tabela `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Índices para tabela `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `OrderItems`
--
ALTER TABLE `OrderItems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de tabela `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`),
  ADD CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`);

--
-- Limitadores para a tabela `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
