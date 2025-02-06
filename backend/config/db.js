// backend/config/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST || 'localhost',
    user: process.env.MYSQL_ADDON_USER || 'root',
    password: process.env.MYSQL_ADDON_PASSWORD || '',
    database: process.env.MYSQL_ADDON_DB || 'mi_base_datos',
    port: process.env.MYSQL_ADDON_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    acquireTimeout: 10000
});

db.getConnection()
    .then(() => console.log('✅ Conectado a la base de datos'))
    .catch(err => console.error('❌ Error de conexión a la base de datos:', err.message));

module.exports = db;
