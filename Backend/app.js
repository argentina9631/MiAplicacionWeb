const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Asegúrate de que la ruta sea correcta

const app = express();

app.use(cors());  // Permitir solicitudes desde otros orígenes
app.use(bodyParser.json());  // Analizar cuerpos JSON

// Usar las rutas de usuario
app.use('/api/users', userRoutes);  // Configuración de la ruta de usuarios

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
