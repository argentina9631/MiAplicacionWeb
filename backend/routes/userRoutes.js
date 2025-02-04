// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

console.log("userController cargado:", userController); // Agregado para depuración

// Ruta para login
router.post("/login", userController.login);

module.exports = router;
