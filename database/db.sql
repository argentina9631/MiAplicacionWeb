#database/db.sql
CREATE DATABASE IF NOT EXISTS db_miaplicacionweb;

USE db_miaplicacionweb;

CREATE TABLE Roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Personas (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_persona INT NOT NULL,
    FOREIGN KEY (id_persona) REFERENCES Personas(id_persona)
);
