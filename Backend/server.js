const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para parsear datos JSON

// Rutas
app.use('/api/usuarios', usuariosRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
