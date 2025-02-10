// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Email o contraseña incorrectos" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.contrasena_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign({ id: user.id_persona, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id_persona, nombre: user.nombre_usuario, email: user.email } });

    } catch (error) {
        console.error("Error en /login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;