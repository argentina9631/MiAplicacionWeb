//backend/app.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de que el archivo exista y esté bien configurado

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: '*', // Acepta cualquier origen temporalmente
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware para analizar cuerpos JSON y datos codificados en URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de depuración
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rutas de la aplicación
app.use('/api/users', userRoutes); // Ruta base para usuarios

// Ruta predeterminada para la raíz (soluciona el "Cannot GET /")
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Puerto de escucha
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});