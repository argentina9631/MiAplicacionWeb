const mysql = require('mysql2');

// Configuración de la conexión
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Cambia esto si tienes otro usuario
  password: '9631argentina',       // Cambia esto si tienes una contraseña
  database: 'db_miaplicacionweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
