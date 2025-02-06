// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userController");

console.log("✅ Rutas de usuarios cargadas");

router.post("/login", (req, res) => {
  console.log("➡️ POST /api/users/login recibido");
  loginUser(req, res);
});

module.exports = router;
