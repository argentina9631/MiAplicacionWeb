// backend/app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Ruta raíz para comprobar que el servidor está corriendo
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
