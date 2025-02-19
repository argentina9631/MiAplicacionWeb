// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para permitir múltiples orígenes
const allowedOrigins = [
  'http://localhost:3000',
  'https://miaplicacionweb.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());

// Verificar la conexión a MySQL
(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_ADDON_HOST,
      user: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
    });

    console.log("Conexión a MySQL exitosa");
    await connection.end(); // Cierra la conexión después de verificarla
  } catch (error) {
    console.error("Error al conectar con MySQL:", error);
  }
})();

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_ADDON_HOST,
      user: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
    });

    const [rows] = await connection.execute(
      'SELECT * FROM Personas WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    await connection.end();
  } catch (error) {
    console.error('Error en la ruta de login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

