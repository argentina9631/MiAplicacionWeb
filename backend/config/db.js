// backend/config/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Limitar el número de conexiones
  queueLimit: 0,
});

pool.getConnection()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

module.exports = pool;