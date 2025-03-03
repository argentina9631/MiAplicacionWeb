// backend/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9631argentina',
  database: 'db_miaplicacionweb',
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