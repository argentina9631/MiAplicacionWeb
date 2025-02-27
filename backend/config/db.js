// backend/config/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Configurar el pool de conexiones para Clever Cloud
const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT || 3306, // Puerto por defecto
    waitForConnections: true,
    connectionLimit: 5, // Límite según Clever Cloud
    queueLimit: 0 // Sin límite en la cola de conexiones
});

// Probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a la base de datos exitosa en Clever Cloud');
        connection.release(); // Liberar la conexión al pool
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
        process.exit(1); // Detener la aplicación si la conexión falla
    }
};

testConnection();

module.exports = pool;