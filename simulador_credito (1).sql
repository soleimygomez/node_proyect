-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2021 a las 02:44:33
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `simulador_credito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `cedula` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `documento` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`cedula`, `nombre`, `apellido`, `telefono`, `direccion`, `correo`, `documento`) VALUES
(1, 'soelimy', ' daniela ', '3204469000', 'dalellll', 'danielagbaron', ''),
(2, 'sole', 'baron', '3204469222', 'sdad', 'adada', ''),
(589, 'soleJJJ', 'baron', '3204469222', 'sdad', 'adada', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `monto` float NOT NULL,
  `interes` int(11) NOT NULL,
  `cuotas` int(11) NOT NULL,
  `forma_pago` varchar(30) NOT NULL,
  `valorcuota` float DEFAULT NULL,
  `cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`id`, `monto`, `interes`, `cuotas`, `forma_pago`, `valorcuota`, `cliente`) VALUES
(2, 458889, 12, 24, '0', 0, 2),
(4, 588, 10, 21, 'kdlkdlk', 888966, 589),
(5, 556445, 20, 21, 'tarjeta', NULL, 589);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente` (`cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`cedula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
