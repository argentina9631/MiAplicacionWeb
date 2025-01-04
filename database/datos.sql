INSERT INTO Roles (nombre) VALUES ('Administrador'), ('Usuario');

INSERT INTO Personas (nombre, email) VALUES ('Juan Pérez', 'juan@example.com');

INSERT INTO Usuarios (email, password, id_persona)
VALUES ('juan@example.com', '$2a$10$Sfs7Pw06ImlGS0Kgz.dVVuhUtNJhRGWrb.R71bRPS3rt5kbWCtWjO', 1);
