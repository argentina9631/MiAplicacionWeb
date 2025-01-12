const mysql = require('mysql2/promise'); // Usa la versión con promesas de mysql2

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST || 'b8biz3pozkccjo4cgtlo-mysql.services.clever-cloud.com',
  user: process.env.MYSQL_ADDON_USER || 'umjqezvfshle1hsn',
  password: process.env.MYSQL_ADDON_PASSWORD || 'Jk4asxYTAhD8hd367zgo',
  database: process.env.MYSQL_ADDON_DB || 'b8biz3pozkccjo4cgtlo',
  port: process.env.MYSQL_ADDON_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0,
});

module.exports = pool;
