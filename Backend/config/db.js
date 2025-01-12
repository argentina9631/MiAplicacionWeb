const mysql = require('mysql2/promise'); // Usa la versión con promesas de mysql2

const pool = mysql.createPool({
  host: 'b8biz3pozkccjo4cgtlo-mysql.services.clever-cloud.com',
  user: 'umjqezvfshle1hsn',
  password: 'Jk4asxYTAhD8hd367zgo',
  database: 'b8biz3pozkccjo4cgtlo',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0,
});

module.exports = pool;
