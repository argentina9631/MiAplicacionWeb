//La ruta de este archivo es backend/app.js
require('dotenv').config(); // Carga las variables de entorno desde .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Asegúrate de que la ruta sea correcta

const app = express();

app.use(cors());  // Permitir solicitudes desde otros orígenes
app.use(bodyParser.json());  // Analizar cuerpos JSON

// Usar las rutas de usuario
app.use('/api/users', userRoutes);  // Configuración de la ruta de usuarios

// Definir el puerto desde el .env o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

