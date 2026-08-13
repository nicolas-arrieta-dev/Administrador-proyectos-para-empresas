-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2025 a las 22:59:22
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`` PROCEDURE `Actualizar_empleado` (IN `p_id` VARCHAR(200), IN `p_dni` VARCHAR(200), IN `p_nombre` VARCHAR(200), IN `p_apellido` VARCHAR(200), IN `p_direccion` VARCHAR(200), IN `p_email` VARCHAR(200), IN `p_celular` VARCHAR(200))   BEGIN
UPDATE empleados Set Id_trabajador = p_id, DNI = P_dni, Nombre = p_nombre, Apellido = p_apellido, Direccion = p_direccion, Email = p_email, Celular = p_celular WHERE Id_trabajador = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `Actualizar_empresa` (IN `p_CIF` VARCHAR(40), IN `p_RIT` VARCHAR(40), IN `p_Nombre` VARCHAR(200), IN `p_Direccion` VARCHAR(200), IN `p_Telefono` VARCHAR(200), IN `p_Email` VARCHAR(200), IN `p_Sector` VARCHAR(200), IN `p_Nombre_encargado` VARCHAR(200))   BEGIN
    UPDATE empresas
    SET 
        RIT = p_RIT,
        Nombre = p_Nombre,
        Direccion = p_Direccion,
        Telefono = p_Telefono,
        Email = p_Email,
        Sector = p_Sector,
        Nombre_encargado = p_Nombre_encargado
    WHERE CIF = p_CIF;
END$$

CREATE DEFINER=`` PROCEDURE `Actualizar_horas` (`ide` VARCHAR(200), `hora` VARCHAR(200))   BEGIN
UPDATE asociados set horas_trabajadas = horas_trabajadas + hora WHERE id = ide;
END$$

CREATE DEFINER=`` PROCEDURE `comenzar_proyecto` (`ide` VARCHAR(200), `p_estado` VARCHAR(200), `fecha` VARCHAR(200))   BEGIN
UPDATE proyectos SET Estado = p_estado , fecha_inicio_real = fecha WHERE Id = ide;
END$$

CREATE DEFINER=`` PROCEDURE `consultar_empleado` (IN `ide` VARCHAR(200))   BEGIN
 SELECT * FROM empleados where id_trabajador = ide;
 END$$

CREATE DEFINER=`` PROCEDURE `consultar_empresa` (`ide` VARCHAR(200))   BEGIN
SELECT * FROM empresas WHERE CIF  = ide;
END$$

CREATE DEFINER=`` PROCEDURE `crear_usuario` (IN `p_nombre` VARCHAR(100), IN `p_pass` VARCHAR(100))   BEGIN
INSERT usuarios(Usuario, Pass) VALUES(p_nombre, p_pass);
END$$

CREATE DEFINER=`` PROCEDURE `eliminar_empleado` (IN `p_id_empleado` INT)   BEGIN
    DELETE FROM empleados
    WHERE Id_trabajador = p_id_empleado;
END$$

CREATE DEFINER=`` PROCEDURE `eliminar_empleado_asociado` (IN `ide` VARCHAR(200))   BEGIN
    DELETE FROM asociados WHERE id = ide;
END$$

CREATE DEFINER=`` PROCEDURE `eliminar_empresa` (IN `p_CIF` VARCHAR(20))   BEGIN
    DELETE FROM empresas
    WHERE CIF = p_CIF;
END$$

CREATE DEFINER=`` PROCEDURE `Insertar_asosiados` (IN `p_id_proyecto` INT, IN `p_id_empleado` INT, IN `p_id_profesion` INT, IN `p_fecha_ingreso` DATE)   BEGIN
    INSERT INTO asociados (
        id_proyecto,
        id_empleado,
        id_profesion,
        horas_trabajadas,
        fecha_ingreso
    ) VALUES (
        p_id_proyecto,
        p_id_empleado,
        p_id_profesion,
        '0',
        p_fecha_ingreso
    );
END$$

CREATE DEFINER=`` PROCEDURE `insertar_empresas` (IN `p_CIF` VARCHAR(50), IN `p_RIT` VARCHAR(50), IN `p_Nombre` VARCHAR(100), IN `p_Direccion` VARCHAR(150), IN `p_Telefono` VARCHAR(20), IN `p_Email` VARCHAR(20), IN `p_Sector` VARCHAR(50), IN `p_Nombre_encargado` VARCHAR(100), IN `p_Logo` VARCHAR(255), IN `p_Fecha_registro` DATE)   BEGIN
    INSERT INTO empresas (
        CIF,
        RIT,
        Nombre,
        Direccion,
        Telefono,
        Email,
        Sector,
        Nombre_encargado,
        Logo,
        Fecha_registro
    ) VALUES (
        p_CIF,
        p_RIT,
        p_Nombre,
        p_Direccion,
        p_Telefono,
        p_Email,
        p_Sector,
        p_Nombre_encargado,
        p_Logo,
        p_Fecha_registro
    );
END$$

CREATE DEFINER=`` PROCEDURE `Insertar_Proyecto` (IN `p_Nombre` VARCHAR(100), IN `p_id_empresa` VARCHAR(100), IN `p_fecha_inicio` VARCHAR(100), IN `p_fecha_finalizacion` VARCHAR(100), IN `p_estado` VARCHAR(100))   BEGIN
    INSERT INTO proyectos (
        Nombre,
        id_empresa,
        fecha_inicio,
        fecha_finalizacion,
        Estado
    ) VALUES (
        p_Nombre,
        p_id_empresa,
        p_fecha_inicio,
        p_fecha_finalizacion,
        p_estado
    );

END$$

CREATE DEFINER=`` PROCEDURE `Insertar_Trabajador` (IN `p_Id_trabajador` VARCHAR(200), IN `p_DNI` VARCHAR(200), IN `p_Nombre` VARCHAR(100), IN `p_Apellido` VARCHAR(100), IN `p_Direccion` VARCHAR(255), IN `p_Email` VARCHAR(100), IN `p_Celular` VARCHAR(20))   BEGIN
    INSERT INTO empleados (
        Id_trabajador,
        DNI,
        Nombre,
        Apellido,
        Direccion,
        Email,
        Celular
    ) VALUES (
        p_Id_trabajador,
        p_DNI,
        p_Nombre,
        p_Apellido,
        p_Direccion,
        p_Email,
        p_Celular
    );
END$$

CREATE DEFINER=`` PROCEDURE `mostrar_todo_empleados` ()   BEGIN
SELECT * FROM empleados;
END$$

CREATE DEFINER=`` PROCEDURE `Mostrar_todo_empresas` ()   BEGIN
SELECT * FROM empresas;
END$$

CREATE DEFINER=`` PROCEDURE `mostrar_todo_profesion` ()   BEGIN
SELECT * From profesion;
END$$

CREATE DEFINER=`` PROCEDURE `Mostrar_todo_proyetos` ()   BEGIN
SELECT p.*, e.Nombre as Nombre_empresa, e.Logo FROM proyectos p JOIN empresas e on p.id_empresa = e.CIF;
END$$

CREATE DEFINER=`` PROCEDURE `ObtenerProyectosPorEmpleado` (IN `p_IdEmpleado` INT)   BEGIN
    SELECT 
        p.Id AS id_proyecto,
        p.Nombre AS nombre_proyecto,
        emp.Nombre AS nombre_empresa,
        p.fecha_inicio,
        p.fecha_finalizacion,
        p.fecha_inicio_real,
        p.fecha_fin_real,
        p.Estado,
        
        e.Id_trabajador,
        e.DNI,
        e.Nombre AS nombre_empleado,
        e.Apellido,
        e.Direccion,
        e.Email,
        e.Celular
    FROM 
        proyectos p
    INNER JOIN 
        asociados a ON p.Id = a.id_proyecto
    INNER JOIN 
        empleados e ON a.id_empleado = e.Id_trabajador
    INNER JOIN 
        empresas emp ON p.id_empresa = emp.CIF
    WHERE 
        e.Id_trabajador = p_IdEmpleado;
END$$

CREATE DEFINER=`` PROCEDURE `proyectos` (`ide` VARCHAR(200))   BEGIN
SELECT 
 
    p.Id AS id_proyecto,
    p.Nombre AS nombre_proyecto,
    p.fecha_inicio,
    p.fecha_finalizacion,
    p.fecha_inicio_real,
    p.fecha_fin_real,
    p.Estado AS estado_proyecto,


    e.Nombre AS nombre_empresa,
    e.Direccion AS direccion_empresa,
    e.Logo AS logo_empresa,
    e.Email AS email_empresa,
    e.Telefono AS telefono_empresa,
    e.Sector,
    e.Nombre_encargado,
    e.Fecha_registro,

  	emp.Id_trabajador as Id_trabajador,
    emp.Nombre AS nombre_empleado,
    emp.Apellido,
    emp.Celular As Celular_empleado,
    prof.Nombre AS profesion,
    a.fecha_ingreso,
    a.id as Id_asociado,
    a.horas_trabajadas

FROM proyectos p


JOIN empresas e ON p.id_empresa = e.CIF


LEFT JOIN asociados a ON a.id_proyecto = p.Id

LEFT JOIN empleados emp ON emp.Id_trabajador = a.id_empleado

LEFT JOIN profesion prof ON prof.id = a.id_profesion


WHERE p.Id = ide;
END$$

CREATE DEFINER=`` PROCEDURE `terminar_proyecto` (`ide` VARCHAR(100), `p_estado` VARCHAR(200), `fecha` VARCHAR(200))   BEGIN
UPDATE proyectos SET Estado = p_estado , fecha_fin_real = fecha WHERE Id = ide;
END$$

CREATE DEFINER=`` PROCEDURE `VerificarUsuario` (IN `p_usuario` VARCHAR(100), IN `p_pass` VARCHAR(100))   BEGIN
    SELECT Id, Usuario
    FROM usuarios
    WHERE Usuario = p_usuario AND Pass = p_pass;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asociados`
--

CREATE TABLE `asociados` (
  `id` int(50) NOT NULL,
  `id_proyecto` varchar(200) NOT NULL,
  `id_empleado` varchar(200) NOT NULL,
  `id_profesion` varchar(200) NOT NULL,
  `horas_trabajadas` varchar(200) NOT NULL,
  `fecha_ingreso` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asociados`
--

INSERT INTO `asociados` (`id`, `id_proyecto`, `id_empleado`, `id_profesion`, `horas_trabajadas`, `fecha_ingreso`) VALUES
(49, '3', '1', '1', '0', '2025-05-02'),
(51, '7', '9', '1', '0', '2025-05-02'),
(52, '7', '1', '2', '0', '2025-05-02'),
(54, '8', '9', '3', '7', '2025-05-05'),
(55, '6', '2', '1', '0', '2025-05-05'),
(56, '6', '1', '4', '0', '2025-05-05'),
(57, '3', '9', '0', '0', '2025-05-05'),
(58, '8', '3', '1', '2', '2025-05-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `Id_trabajador` int(50) NOT NULL,
  `DNI` varchar(200) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Apellido` varchar(200) NOT NULL,
  `Direccion` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Celular` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`Id_trabajador`, `DNI`, `Nombre`, `Apellido`, `Direccion`, `Email`, `Celular`) VALUES
(1, '1', 'Nicolas alonsoo', 'arrieta bolaño', 'mi casa', 'nicolas@si.com', '3024146396'),
(2, '2', 'Gustavo', 'Avila', 'calle 10', 'Nuevo@gmail.com', '3024145432'),
(9, '9', 'juliana', 'barrera', 'mi casa', 'obvio', '3024146396');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `CIF` int(50) NOT NULL,
  `RIT` varchar(200) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Direccion` varchar(200) NOT NULL,
  `Telefono` varchar(200) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Sector` varchar(200) NOT NULL,
  `Nombre_encargado` varchar(200) NOT NULL,
  `Logo` varchar(200) DEFAULT NULL,
  `Fecha_registro` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`CIF`, `RIT`, `Nombre`, `Direccion`, `Telefono`, `Email`, `Sector`, `Nombre_encargado`, `Logo`, `Fecha_registro`) VALUES
(2, '2', 'Universidad del sinú', 'No. 38-153 4536534, Cra. 1W, Montería, Córdoba', '3212232411', 'unisinu@unisinu.edu.com', 'Educativo', 'Antonio Borre', 'c1df2fd612464de2ab3143ecc15a70c4.jpeg', '2025-05-01'),
(3, '3', 'Postobon', 'Calle 69, 5-179, Montería, Córdoba', '3024145834', 'postobom@postobom.co', 'Comercial', 'Jose jose', '4cd729c25aa3482daa7a7aec993fb927.webp', '2025-05-01'),
(4, '4', 'Cerro Matoso', 'Km. 22 Carretera S.O, Montelíbano, Córdoba', '32165743834', 'cerromatoso@cerromat', 'Minero-industrial', 'Pabel lopez', 'ddf462bdaddb49c2a8e892e3cf9a8385.jpg', '2025-05-01'),
(5, '5', 'Ara', 'Calle 100 # 7-33, piso 11, Torre Capital Tower, en Bogotá, Colombia', '30421435768', 'TiendasAra@gamil.com', 'Economico', 'Alegría al mejor precio', 'c4e98f3eddd344bd9596066c05ecc769.jpg', '2025-05-01'),
(6, '6', 'Bancolombia', 'Carrera 48 # 26 – 85, en la ciudad de Medellín, Colombia.', '30145967477', 'Bancolombia@bancolom', 'Finanaciero ', 'Andres jose', '22c05548638649ae9286cda1592842bb.webp', '2025-05-01'),
(7, '7', 'Soluciones integrales R&S', 'Cl. 42 #9-5, Montería, Córdoba', '3235022464', 'Admon@solucionesinte', ' Actividades Juridicas', 'Juliana Barrera', '12f442120bf7472f837cb059423aefcb.jpeg', '2025-05-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesion`
--

CREATE TABLE `profesion` (
  `id` int(50) NOT NULL,
  `Nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesion`
--

INSERT INTO `profesion` (`id`, `Nombre`) VALUES
(1, 'Jefe de Proyecto'),
(2, 'Programador'),
(3, 'Analista'),
(4, 'Admnisitrador de Diseño');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `Id` int(50) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `id_empresa` varchar(200) NOT NULL,
  `fecha_inicio` varchar(200) NOT NULL,
  `fecha_finalizacion` varchar(200) NOT NULL,
  `Estado` varchar(200) NOT NULL,
  `fecha_inicio_real` varchar(200) DEFAULT NULL,
  `fecha_fin_real` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`Id`, `Nombre`, `id_empresa`, `fecha_inicio`, `fecha_finalizacion`, `Estado`, `fecha_inicio_real`, `fecha_fin_real`) VALUES
(3, 'Mi primer proyecto', '2', '2025-05-01', '2025-05-21', 'Terminado', '2025-05-05 16:20:35', '2025-05-05 16:20:40'),
(4, 'Poyecto de prueba', '3', '2025-05-01', '2025-05-03', 'Cancelado', '2025-05-02 23:15:30', '2025-05-03 16:48:41'),
(6, 'PRUEBAAA', '4', '2025-05-01', '2025-05-29', 'En curso', '2025-05-03 16:33:26', ''),
(8, 'Gestión de calidad', '5', '2025-05-01', '2025-07-31', 'En curso', '2025-05-05 16:28:16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(100) NOT NULL,
  `Usuario` varchar(200) NOT NULL,
  `Pass` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Usuario`, `Pass`) VALUES
(4, 'usuario1', '321'),
(8, 'nicox', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asociados`
--
ALTER TABLE `asociados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`Id_trabajador`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`CIF`);

--
-- Indices de la tabla `profesion`
--
ALTER TABLE `profesion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asociados`
--
ALTER TABLE `asociados`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `profesion`
--
ALTER TABLE `profesion`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `Id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
