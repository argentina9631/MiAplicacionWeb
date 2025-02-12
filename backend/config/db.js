// Nombre del archivo original: db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1); // Detener la ejecución si no se puede conectar
  } else {
    console.log(`✅ Conectado a la base de datos: ${process.env.DB_NAME}`);
  }
});

module.exports = connection;
