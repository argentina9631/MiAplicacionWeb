// backend/config/db.js
const mysql = require('mysql2');

// Configuración de la conexión con promesas
const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '9631argentina',
  database: process.env.DB_NAME || 'db_miaplicacionweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar la conexión
connection.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Error de conexión a la base de datos:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos");
    conn.release();
  }
});

// Exportar con soporte de promesas
module.exports = connection.promise();
