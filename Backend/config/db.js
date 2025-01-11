const mysql = require('mysql2');

// Configuración de la conexión
/*
const connection  = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Cambia esto si tienes otro usuario
  password: '9631argentina',       // Cambia esto si tienes una contraseña
  database: 'db_miaplicacionweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
*/
const connection  = mysql.createConnection({
  host: 'b8biz3pozkccjo4cgtlo-mysql.services.clever-cloud.com',
  user: 'umjqezvfshle1hsn',       // Cambia esto si tienes otro usuario
  password: 'Jk4asxYTAhD8hd367zgo',       // Cambia esto si tienes una contraseña
  database: 'b8biz3pozkccjo4cgtlo',
  port: 3306,
});

// Verificar que la conexión se haya realizado correctamente
connection.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }
  console.log("Conectado a la base de datos con el ID " + connection.threadId);
});

module.exports = connection;
