// backend/controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const loginUser = async (req, res) => {
  try {
    console.log("🔹 Request body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.contrasena_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id_usuario: user.id_usuario, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login exitoso para:", user.email);
    res.status(200).json({ message: "Login exitoso", token, user });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { loginUser };
