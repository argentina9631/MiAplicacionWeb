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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Origen no permitido por CORS: ${origin}`);
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true, // Si necesitas enviar cookies o encabezados personalizados
  })
);

// Analizar cuerpos JSON
app.use(bodyParser.json());

// Middleware para depuración (opcional, solo para verificar orígenes)
app.use((req, res, next) => {
  console.log(`Solicitud recibida de origen: ${req.headers.origin}`);
  next();
});

// Usar las rutas de usuario
app.use('/api/users', userRoutes); // Ruta base para las solicitudes relacionadas con usuarios

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
