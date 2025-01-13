const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Verificar que el controlador esté correctamente importado
if (!userController || typeof userController.login !== 'function') {
  console.error(
    'Error: userController no está definido o no tiene un método "login". Asegúrate de que userController está configurado correctamente.'
  );
} else {
  console.log('userController cargado correctamente:', userController);
}

// Ruta para login
router.post('/login', (req, res, next) => {
  try {
    userController.login(req, res, next); // Llamada al controlador de login
  } catch (error) {
    console.error('Error en la ruta /login:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Exportar las rutas
module.exports = router;
