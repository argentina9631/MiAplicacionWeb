// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userController"); // Importación correcta

console.log("✅ Rutas de usuarios cargadas");

// Ruta para iniciar sesión
router.post("/login", (req, res) => {
  console.log("➡️ POST /api/users/login recibido"); // Debug
  loginUser(req, res);
});

module.exports = router;
