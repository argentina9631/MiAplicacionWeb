// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userController");

console.log("✅ Rutas de usuarios cargadas");

router.post("/login", loginUser);

module.exports = router;
