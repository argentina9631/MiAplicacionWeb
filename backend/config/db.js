// backend/config/db.js
require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST || process.env.DB_HOST,
    port: process.env.MYSQL_ADDON_PORT || process.env.DB_PORT || 3306,
    user: process.env.MYSQL_ADDON_USER || process.env.DB_USER,
    password: process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQL_ADDON_DB || process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos:', process.env.MYSQL_ADDON_DB || process.env.DB_NAME);
    }
});

module.exports = connection;
