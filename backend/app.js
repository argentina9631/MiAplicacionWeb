// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://miaplicacionweb.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());

// Verificar la conexión a MySQL
db.getConnection()
  .then(connection => {
    console.log("Conexión a MySQL exitosa");
    connection.release();
  })
  .catch(error => {
    console.error("Error al conectar con MySQL:", error);
  });

// Rutas
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});