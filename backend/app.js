// Nombre del archivo original: app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Asegurar conexión con la base de datos
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

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
app.use('/api/users', userRoutes);

// Ruta raíz para evitar errores 404 en producción
app.get('/', (req, res) => {
  res.send('API en funcionamiento');
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error interno del servidor:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Puerto del servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
