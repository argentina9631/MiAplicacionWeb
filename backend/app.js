// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
