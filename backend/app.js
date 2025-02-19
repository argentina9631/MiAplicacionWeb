// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const personRoutes = require('./routes/personRoutes');
require('./config/db'); // Asegurar que la base de datos esté conectada

// Configuración de CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // URL del cliente, por defecto localhost para desarrollo
  credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/personas', personRoutes);

// Control de errores genéricos
app.use((err, req, res, next) => {
  console.error('Error interno del servidor:', err.message); // Mejor visibilidad del error
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Escuchar en el puerto configurado
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
