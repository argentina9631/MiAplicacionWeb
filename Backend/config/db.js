//backend/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  // Usar variable de entorno o localhost
  user: process.env.DB_USER || 'root',  // Usar variable de entorno o 'root' localmente
  password: process.env.DB_PASSWORD || '9631argentina',  // Usar variable de entorno o contraseña local
  database: process.env.DB_NAME || 'db_miaplicacionweb',  // Usar variable de entorno o base de datos local
  port: process.env.DB_PORT || 3306,  // Usar variable de entorno o puerto local
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }
  console.log("Conectado a la base de datos con el ID " + connection.threadId);
});

module.exports = connection;
