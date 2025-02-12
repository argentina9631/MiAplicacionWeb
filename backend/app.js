// backend/app.js
const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db'); // Importar la función correctamente
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB(); // Llamar a la función para establecer la conexión

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logs detallados en desarrollo

// Rutas
app.use('/api/users', userRoutes);

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
