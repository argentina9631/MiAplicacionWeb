// backend/config/db.js
// db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_ADDON_HOST,
      user: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
      port: process.env.MYSQL_ADDON_PORT || 3306,
    });
    console.log(`✅ Conectado a la base de datos: ${process.env.MYSQL_ADDON_DB}`);
    global.dbConnection = connection;
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };

