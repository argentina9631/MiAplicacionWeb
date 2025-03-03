//backend/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'b8biz3pozkccjo4cgtlo-mysql.services.clever-cloud.com', //localmente es 'localhost'
  user: 'umjqezvfshle1hsn',//localmente es 'root'
  password: 'Jk4asxYTAhD8hd367zgo',//localmente es '9631argentina'
  database: 'b8biz3pozkccjo4cgtlo',//localmente es 'db_miaplicacionweb'
  port:'3306',//localmente no va esta linea
  waitForConnections: true,
  connectionLimit: 10,
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