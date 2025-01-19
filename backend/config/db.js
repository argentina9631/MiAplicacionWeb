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
  connectTimeout: 10000, // Tiempo de espera máximo en ms para conectarse
});

// Verificar la conexión al crear el pool
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos en Clever Cloud exitosa.');
    connection.release(); // Libera la conexión de vuelta al pool
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.code, err.message);
  }
})();

// Manejador para reconexión manual en caso de errores
pool.on('error', (err) => {
  console.error('Error en el pool de conexiones:', err.code, err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Conexión perdida. Intentando reconectar...');
    // Aquí puedes implementar lógica para reiniciar el pool o alertar al usuario
  }
});

module.exports = pool;