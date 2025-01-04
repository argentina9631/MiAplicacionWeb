const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Obtener todos los usuarios
router.get('/', usuariosController.getUsuarios);

// Obtener un usuario por ID
router.get('/:id', usuariosController.getUsuarioById);

// Crear un nuevo usuario
router.post('/', usuariosController.createUsuario);

// Actualizar un usuario
router.put('/:id', usuariosController.updateUsuario);

// Eliminar un usuario
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
