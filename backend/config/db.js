//backend/config/db.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const mysql = require('mysql2/promise'); // Usa la versión con promesas de mysql2

// Crear un pool de conexiones con las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306, // Puertos de MySQL son estándar, no necesitas configurarlos si Clever usa 3306
  waitForConnections: true,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0,
  connectTimeout: 10000, // Tiempo de espera máximo en ms para conectarse
});

// Verificar la conexión al inicializar el pool
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos en Clever Cloud exitosa.');
    connection.release(); // Libera la conexión de vuelta al pool
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.code, err.message);
  }
})();

// Manejador de errores del pool
pool.on('error', (err) => {
  console.error('Error en el pool de conexiones:', err.code, err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Conexión perdida. Verifica tu configuración.');
  }
});

module.exports = pool;
