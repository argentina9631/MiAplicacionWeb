// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Verificar si el controlador tiene el método 'login'
if (!userController || typeof userController.login !== 'function') {
  console.error('Error: userController no está configurado correctamente.');
  throw new Error('El controlador userController está mal configurado.');
}

// Ruta para login
router.post('/login', async (req, res, next) => {
  try {
    await userController.login(req, res, next); // Llamada asíncrona al controlador de login
  } catch (error) {
    console.error('Error en la ruta /login:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Exportar las rutas
module.exports = router;
