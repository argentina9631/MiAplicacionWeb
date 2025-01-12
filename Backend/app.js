const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de que el archivo exista y esté bien configurado

const app = express();

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000', // Origen local para desarrollo
  'https://mi-frontend.vercel.app', // Reemplaza con la URL real de tu frontend en Vercel
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true, // Si necesitas enviar cookies o encabezados personalizados
  })
);

// Analizar cuerpos JSON
app.use(bodyParser.json());

// Usar las rutas de usuario
app.use('/api/users', userRoutes); // Ruta base para las solicitudes relacionadas con usuarios

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
