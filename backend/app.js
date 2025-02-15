// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const dotenv = require('dotenv');

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

// Conectar a la base de datos
try {
  db.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });
} catch (error) {
  console.error('Error al iniciar la aplicación:', error.message);
}

// Configurar el puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});