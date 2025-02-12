// backend/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const connectDB = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_ADDON_HOST,
      user: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
      port: process.env.MYSQL_ADDON_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 5, // Reducido para evitar ECONNRESET
      queueLimit: 0
    });

    // Probar la conexión
    const conn = await pool.getConnection();
    console.log(`✅ Conectado a la base de datos: ${process.env.MYSQL_ADDON_DB}`);
    conn.release();

    // Retornar la conexión pool
    return pool;
  } catch (err) {
    console.error(`❌ Error al conectar a la base de datos: ${err.message}`);
    process.exit(1); // Salir si hay un error crítico en la conexión
  }
};

module.exports = connectDB;
