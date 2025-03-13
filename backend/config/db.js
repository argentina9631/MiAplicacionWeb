const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST, 
  user: process.env.MYSQL_ADDON_USER, 
  password: process.env.MYSQL_ADDON_PASSWORD, 
  database: process.env.MYSQL_ADDON_DB, 
  port: process.env.MYSQL_ADDON_PORT || 3306, // Si no hay puerto en .env, usa 3306
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// Comprobar conexión con la base de datos
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error en la conexión a la base de datos:', err.message);
    return;
  }
  console.log('✅ Base de datos conectada correctamente');
  connection.release();
});

module.exports = db;
