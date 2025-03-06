//backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Asegúrate de que la ruta sea correcta
require('dotenv').config(); // Cargar variables de entorno

const app = express();

app.use(cors());  // Permitir solicitudes desde otros orígenes
app.use(bodyParser.json());  // Analizar cuerpos JSON

// Usar las rutas de usuario
app.use('/api/users', userRoutes);  // Configuración de la ruta de usuarios

// Puerto de escucha
const port = process.env.PORT || 3000;  // Usar el puerto de Clever Cloud o 3000 localmente
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

