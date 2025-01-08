const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Verificar que user tiene contrasena_hash
    console.log("user:", user);
    console.log("password:", password);
    console.log("contrasena_hash:", user.contrasena_hash);

    const isValidPassword = await bcrypt.compare(password, user.contrasena_hash);
    if (!isValidPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id_usuario, email: user.email }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
