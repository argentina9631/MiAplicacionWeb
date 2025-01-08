const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

console.log(userController);  // Agrega esta línea para ver el objeto

// Ruta para login
router.post('/login', userController.login);

// Exportar las rutas
module.exports = router;
