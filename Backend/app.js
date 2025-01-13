const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de que el archivo exista y esté bien configurado

const app = express();

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000', // Origen local para desarrollo
  'http://localhost:3001', // Origen local alternativo
  'https://miaplicacionweb.vercel.app', // URL de tu aplicación en Vercel
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origen no permitido por CORS: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // Permitir cookies o encabezados personalizados
};

app.use(cors(corsOptions));

// Middleware para analizar cuerpos JSON y datos codificados en URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para depuración (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Solicitud recibida: ${req.method} ${req.url} desde origen ${req.headers.origin || 'desconocido'}`);
  next();
});

// Rutas de la aplicación
app.use('/api/users', userRoutes); // Ruta base para las solicitudes relacionadas con usuarios

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error general:', err.message);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
