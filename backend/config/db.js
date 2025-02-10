// backend/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const {
    MYSQL_ADDON_HOST,
    MYSQL_ADDON_USER,
    MYSQL_ADDON_PASSWORD,
    MYSQL_ADDON_DB,
    MYSQL_ADDON_PORT
} = process.env;

const db = mysql.createPool({
    host: MYSQL_ADDON_HOST || '127.0.0.1',
    user: MYSQL_ADDON_USER || 'root',
    password: MYSQL_ADDON_PASSWORD || '',
    database: MYSQL_ADDON_DB || 'mi_base_datos',
    port: MYSQL_ADDON_PORT ? parseInt(MYSQL_ADDON_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    acquireTimeout: 10000
});

db.getConnection()
    .then(connection => {
        console.log(`✅ Conectado a la base de datos: ${MYSQL_ADDON_DB || 'mi_base_datos'}`);
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error de conexión a la base de datos:', err.message);
        process.exit(1);
    });

module.exports = db;
