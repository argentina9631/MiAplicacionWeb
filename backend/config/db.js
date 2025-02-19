// backend/config/db.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Configurar el pool de conexiones
const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT || 3306, // Puerto por defecto
    waitForConnections: true,
    connectionLimit: 10, // Límite de conexiones simultáneas
    queueLimit: 0, // No limitar la cola de conexiones
});

// Probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos exitosa');
        connection.release(); // Liberar la conexión de vuelta al pool
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Detener la aplicación si la conexión falla
    }
};

testConnection();

module.exports = pool;

