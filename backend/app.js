// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const dotenv = require('dotenv');
const personRoutes = require('./routes/personRoutes'); // Nueva ruta para manejar personas

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Configurar CORS
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('El origen no está permitido por la política de CORS.'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.use('/api/personas', personRoutes); // Nueva ruta para personas

// Conectar a la base de datos
(async () => {
  try {
    await db.getConnection();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

// Configurar el puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});