-- 1. Crear la base de datos
USE b8biz3pozkccjo4cgtlo;

-- 2. Crear tabla de roles con IDs específicos
CREATE TABLE Roles (
    id_rol INT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles con los IDs específicos
INSERT INTO Roles (id_rol, nombre_rol) VALUES
(1, 'Administrador'),    -- ID 1
(2, 'Dueño'),            -- ID 2
(3, 'Supervisor'),       -- ID 3
(4, 'Recepcionista'),    -- ID 4
(5, 'Cliente');          -- ID 5

-- 3. Crear tabla de domicilios
CREATE TABLE Domicilios (
    id_domicilio INT AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    codigo_postal VARCHAR(20),
    pais VARCHAR(100) NOT NULL
);

-- Insertar 50 domicilios internacionales
INSERT INTO Domicilios (direccion, ciudad, estado, codigo_postal, pais) VALUES
('Calle 1', 'Ciudad A', 'Estado X', 'CP1001', 'Argentina'),
('Calle 2', 'Ciudad B', 'Estado Y', 'CP2002', 'España'),
('Rua 3', 'Cidade C', 'Estado Z', 'CP3003', 'Brasil'),
('Street 4', 'City D', 'State W', 'CP4004', 'USA'),
('Avenue 5', 'City E', 'State V', 'CP5005', 'Canadá'),
('Boulevard 6', 'City F', 'State U', 'CP6006', 'Francia'),
('Street 7', 'City G', 'State T', 'CP7007', 'Alemania'),
('Avenida 8', 'Ciudad H', 'Estado S', 'CP8008', 'Italia'),
('Road 9', 'City I', 'State R', 'CP9009', 'Reino Unido'),
('Lane 10', 'City J', 'State Q', 'CP1010', 'Australia'),
('Calle 11', 'Ciudad K', 'Estado P', 'CP1111', 'México'),
('Rua 12', 'Cidade L', 'Estado O', 'CP1212', 'Portugal'),
('Street 13', 'City M', 'State N', 'CP1313', 'Países Bajos'),
('Avenue 14', 'City N', 'State M', 'CP1414', 'Suecia'),
('Boulevard 15', 'City O', 'State L', 'CP1515', 'Noruega'),
('Street 16', 'City P', 'State K', 'CP1616', 'Dinamarca'),
('Avenida 17', 'Ciudad Q', 'Estado J', 'CP1717', 'Suiza'),
('Road 18', 'City R', 'State I', 'CP1818', 'Austria'),
('Lane 19', 'City S', 'State H', 'CP1919', 'Bélgica'),
('Calle 20', 'Ciudad T', 'Estado G', 'CP2020', 'Finlandia'),
('Rua 21', 'Cidade U', 'Estado F', 'CP2121', 'Irlanda'),
('Street 22', 'City V', 'State E', 'CP2222', 'Nueva Zelanda'),
('Avenue 23', 'City W', 'State D', 'CP2323', 'Polonia'),
('Boulevard 24', 'City X', 'State C', 'CP2424', 'Grecia'),
('Street 25', 'City Y', 'State B', 'CP2525', 'Turquía'),
('Avenida 26', 'Ciudad Z', 'Estado A', 'CP2626', 'Israel'),
('Road 27', 'City AA', 'State Z', 'CP2727', 'Irán'),
('Lane 28', 'City AB', 'State Y', 'CP2828', 'India'),
('Calle 29', 'Ciudad AC', 'Estado X', 'CP2929', 'China'),
('Rua 30', 'Cidade AD', 'Estado W', 'CP3030', 'Japón'),
('Street 31', 'City AE', 'State V', 'CP3131', 'Corea del Sur'),
('Avenue 32', 'City AF', 'State U', 'CP3232', 'Rusia'),
('Boulevard 33', 'City AG', 'State T', 'CP3333', 'Suecia'),
('Street 34', 'City AH', 'State S', 'CP3434', 'Países Bajos'),
('Avenida 35', 'Ciudad AI', 'Estado R', 'CP3535', 'Portugal'),
('Road 36', 'City AJ', 'State Q', 'CP3636', 'Hungría'),
('Lane 37', 'City AK', 'State P', 'CP3737', 'República Checa'),
('Calle 38', 'Ciudad AL', 'Estado O', 'CP3838', 'Eslovaquia'),
('Rua 39', 'Cidade AM', 'Estado N', 'CP3939', 'Rumanía'),
('Street 40', 'City AN', 'State M', 'CP4040', 'Bulgaria'),
('Avenue 41', 'City AO', 'State L', 'CP4141', 'Croacia'),
('Boulevard 42', 'City AP', 'State K', 'CP4242', 'Serbia'),
('Street 43', 'City AQ', 'State J', 'CP4343', 'Ucrania'),
('Avenida 44', 'Ciudad AR', 'Estado I', 'CP4444', 'Estonia'),
('Road 45', 'City AS', 'State H', 'CP4545', 'Letonia'),
('Lane 46', 'City AT', 'State G', 'CP4646', 'Lituania'),
('Calle 47', 'Ciudad AU', 'Estado F', 'CP4747', 'Islandia'),
('Rua 48', 'Cidade AV', 'Estado E', 'CP4848', 'Luxemburgo'),
('Street 49', 'City AW', 'State D', 'CP4949', 'Mónaco'),
('Avenue 50', 'City AX', 'State C', 'CP5050', 'Singapur');
    
-- 4. Crear tabla de personas (clientes)
CREATE TABLE Personas (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre_persona VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    dni VARCHAR(20) UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    id_domicilio INT,
    FOREIGN KEY (id_domicilio) REFERENCES Domicilios(id_domicilio) ON DELETE SET NULL
);

-- Insertar 50 personas (clientes) con referencias válidas a domicilios
INSERT INTO Personas (nombre_persona, telefono, dni, email, id_domicilio) VALUES
('Juan Pérez', '+541112345678', 'ARG12345678', 'juan.perez@ejemplo.com', 1),
('María García', '+341112345678', 'ESP12345678', 'maria.garcia@ejemplo.com', 2),
('Carlos Silva', '+551112345678', 'BRA12345678', 'carlos.silva@ejemplo.com', 3),
('Emily Johnson', '+11234567890', 'USA12345678', 'emily.johnson@example.com', 4),
('Liam Smith', '+15141234567', 'CAN12345678', 'liam.smith@example.com', 5),
('Sophie Dubois', '+33121234567', 'FRA12345678', 'sophie.dubois@ejemplo.com', 6),
('Hans Müller', '+491512345678', 'GER12345678', 'hans.mueller@example.com', 7),
('Giulia Rossi', '+390212345678', 'ITA12345678', 'giulia.rossi@example.com', 8),
('James Brown', '+441234567890', 'UK12345678', 'james.brown@example.com', 9),
('Olivia Wilson', '+61123456789', 'AUS12345678', 'olivia.wilson@example.com', 10),
('Alejandro López', '+521234567890', 'MEX12345678', 'alejandro.lopez@ejemplo.com', 11),
('Miguel Sousa', '+351234567890', 'POR12345678', 'miguel.sousa@example.com', 12),
('Anna Schmidt', '+31212345678', 'NLD12345678', 'anna.schmidt@example.com', 13),
('Erik Andersson', '+46123456789', 'SWE12345678', 'erik.andersson@example.com', 14),
('Karin Johansen', '+47912345678', 'NOR12345678', 'karin.johansen@example.com', 15),
('Mikkel Jensen', '+45123456789', 'DNK12345678', 'mikkel.jensen@example.com', 16),
('Laura Müller', '+41791234567', 'CHE12345678', 'laura.mueller@example.com', 17),
('Dmitri Ivanov', '+74951234567', 'RUS12345678', 'dmitri.ivanov@example.com', 18),
('Elena Petrova', '+380501234567', 'UKR12345678', 'elena.petrova@example.com', 19),
('Andrey Smirnov', '+74951234568', 'RUS87654321', 'andrey.smirnov@example.com', 20),
('Maria Novak', '+420123456789', 'CZE12345678', 'maria.novak@example.com', 21),
('Ion Popescu', '+40212345678', 'ROU12345678', 'ion.popescu@example.com', 22),
('Ivan Dimitrov', '+35912345678', 'BGR12345678', 'ivan.dimitrov@example.com', 23),
('Petra Horvath', '+38512345678', 'HRV12345678', 'petra.horvath@example.com', 24),
('Marko Kovač', '+38512345679', 'HRV87654321', 'marko.kovac@example.com', 25),
('Nikolai Sidorov', '+73812345678', 'RUS23456789', 'nikolai.sidorov@example.com', 26),
('Rajesh Kumar', '+911234567890', 'IND12345678', 'rajesh.kumar@example.com', 27),
('Li Wei', '+8612345678901', 'CHN12345678', 'li.wei@example.com', 28),
('Yuki Tanaka', '+811234567890', 'JPN12345678', 'yuki.tanaka@example.com', 29),
('Min-Jun Kim', '+821234567890', 'KOR12345678', 'minjun.kim@example.com', 30),
('Alexei Petrov', '+74951234569', 'RUS34567890', 'alexei.petrov@example.com', 31),
('Sophia Martin', '+33121234568', 'FRA87654321', 'sophia.martin@example.com', 32),
('Tomás García', '+341112345679', 'ESP87654321', 'tomas.garcia@ejemplo.com', 33),
('Pedro Alvarez', '+341112345680', 'ESP87654322', 'pedro.alvarez@ejemplo.com', 34),
('Lucía Fernández', '+341112345681', 'ESP87654323', 'lucia.fernandez@ejemplo.com', 35),
('Mateo Ruiz', '+341112345682', 'ESP87654324', 'mateo.ruiz@ejemplo.com', 36),
('Sofia Romero', '+341112345683', 'ESP87654325', 'sofia.romero@ejemplo.com', 37),
('Lucas Ortega', '+341112345684', 'ESP87654326', 'lucas.ortega@ejemplo.com', 38),
('Valentina Cruz', '+341112345685', 'ESP87654327', 'valentina.cruz@ejemplo.com', 39),
('Daniel Torres', '+341112345686', 'ESP87654328', 'daniel.torres@ejemplo.com', 40),
('Emma Sánchez', '+341112345687', 'ESP87654329', 'emma.sanchez@ejemplo.com', 41),
('Mateo Flores', '+341112345688', 'ESP87654330', 'mateo.flores@ejemplo.com', 42),
('Isabella Morales', '+341112345689', 'ESP87654331', 'isabella.morales@ejemplo.com', 43),
('Benjamin Reyes', '+341112345690', 'ESP87654332', 'benjamin.reyes@ejemplo.com', 44),
('Mia Castillo', '+341112345691', 'ESP87654333', 'mia.castillo@ejemplo.com', 45),
('Noah González', '+341112345692', 'ESP87654334', 'noah.gonzalez@ejemplo.com', 46),
('Ava Herrera', '+341112345693', 'ESP87654335', 'ava.herrera@ejemplo.com', 47),
('Ethan Morales', '+341112345694', 'ESP87654336', 'ethan.morales@ejemplo.com', 48),
('Mila Vargas', '+341112345695', 'ESP87654337', 'mila.vargas@ejemplo.com', 49),
('Oliver Mendoza', '+341112345696', 'ESP87654338', 'oliver.mendoza@ejemplo.com', 50);

-- 5. Crear tabla de usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_persona INT,
    FOREIGN KEY (id_persona) REFERENCES Personas(id_persona) ON DELETE CASCADE
);

-- Insertar usuarios con contraseñas hash (SHA-256)
INSERT INTO Usuarios (nombre_usuario, contrasena_hash, id_persona) VALUES
('admin', SHA2('123456789', 256), 1),        -- Usuario 1: Administrador
('dueno', SHA2('123456789', 256), 2),        -- Usuario 2: Dueño
('supervisor', SHA2('123456789', 256), 3),   -- Usuario 3: Supervisor
('recepcionista', SHA2('123456789', 256), 4),-- Usuario 4: Recepcionista
('cliente1', SHA2('123456789', 256), 5),     -- Usuario 5: Cliente
('cliente2', SHA2('password6', 256), 6),
('cliente3', SHA2('password7', 256), 7),
('cliente4', SHA2('password8', 256), 8),
('cliente5', SHA2('password9', 256), 9),
('cliente6', SHA2('password10', 256), 10),
('cliente7', SHA2('password11', 256), 11),
('cliente8', SHA2('password12', 256), 12),
('cliente9', SHA2('password13', 256), 13),
('cliente10', SHA2('password14', 256), 14),
('cliente11', SHA2('password15', 256), 15),
('cliente12', SHA2('password16', 256), 16),
('cliente13', SHA2('password17', 256), 17),
('cliente14', SHA2('password18', 256), 18),
('cliente15', SHA2('password19', 256), 19),
('cliente16', SHA2('password20', 256), 20),
('cliente17', SHA2('password21', 256), 21),
('cliente18', SHA2('password22', 256), 22),
('cliente19', SHA2('password23', 256), 23),
('cliente20', SHA2('password24', 256), 24),
('cliente21', SHA2('password25', 256), 25),
('cliente22', SHA2('password26', 256), 26),
('cliente23', SHA2('password27', 256), 27),
('cliente24', SHA2('password28', 256), 28),
('cliente25', SHA2('password29', 256), 29),
('cliente26', SHA2('password30', 256), 30),
('cliente27', SHA2('password31', 256), 31),
('cliente28', SHA2('password32', 256), 32),
('cliente29', SHA2('password33', 256), 33),
('cliente30', SHA2('password34', 256), 34),
('cliente31', SHA2('password35', 256), 35),
('cliente32', SHA2('password36', 256), 36),
('cliente33', SHA2('password37', 256), 37),
('cliente34', SHA2('password38', 256), 38),
('cliente35', SHA2('password39', 256), 39),
('cliente36', SHA2('password40', 256), 40),
('cliente37', SHA2('password41', 256), 41),
('cliente38', SHA2('password42', 256), 42),
('cliente39', SHA2('password43', 256), 43),
('cliente40', SHA2('password44', 256), 44),
('cliente41', SHA2('password45', 256), 45),
('cliente42', SHA2('password46', 256), 46),
('cliente43', SHA2('password47', 256), 47),
('cliente44', SHA2('password48', 256), 48),
('cliente45', SHA2('password49', 256), 49),
('cliente46', SHA2('password50', 256), 50);

-- 6. Crear tabla de relación usuarios-roles
CREATE TABLE UsuarioRol (
    id_usuario INT,
    id_rol INT,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol) ON DELETE CASCADE
);

-- Asignar roles a los primeros 5 usuarios
INSERT INTO UsuarioRol (id_usuario, id_rol) VALUES
(1, 1), -- Usuario 1: Administrador
(2, 2), -- Usuario 2: Dueño
(3, 3), -- Usuario 3: Supervisor
(4, 4), -- Usuario 4: Recepcionista
(5, 5); -- Usuario 5: Cliente

-- Asignar rol 'Cliente' a los usuarios del 6 al 50
INSERT INTO UsuarioRol (id_usuario, id_rol)
SELECT id_usuario, 5
FROM Usuarios
WHERE id_usuario BETWEEN 6 AND 50;

