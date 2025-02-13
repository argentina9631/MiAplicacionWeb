// Nombre del archivo original: app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Asegurando la conexión de la base de datos

dotenv.config();

const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Configuración de CORS
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'https://miaplicacionweb.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (por ejemplo, desde herramientas o scripts)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `El origen ${origin} no está permitido por la política de CORS.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Ruta raíz para evitar errores 404 en producción
app.get('/', (req, res) => {
  res.send('API en funcionamiento');
});

// Puerto del servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
