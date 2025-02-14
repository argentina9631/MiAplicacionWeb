//backend/routes/userRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', loginUser);

module.exports = router;
