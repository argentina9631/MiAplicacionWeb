// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
        console.log('📩 Solicitud de login recibida:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            console.warn('⚠️ Email o contraseña faltante');
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            console.warn('⚠️ Usuario no encontrado con email:', email);
            return res.status(400).json({ message: "Email o contraseña incorrectos" });
        }

        console.log('✅ Usuario encontrado:', user);

        // ⚠️ Verificar si la contraseña en la base de datos es realmente un hash
        if (!user.contrasena_hash || user.contrasena_hash.length < 50) {
            console.error('❌ Error: La contraseña en la base de datos no parece estar encriptada.');
            return res.status(500).json({ message: "Error interno: Contraseña no segura" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.contrasena_hash);
        if (!isPasswordValid) {
            console.warn('⚠️ Contraseña incorrecta para usuario:', user.nombre_usuario);
            return res.status(400).json({ message: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign({ id: user.id_usuario, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log('🔐 Token generado para usuario:', user.nombre_usuario);
        res.json({ token, user: { id: user.id_usuario, nombre: user.nombre_usuario, email: user.email } });

    } catch (error) {
        console.error("❌ Error en /login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
