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
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
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
