// backend/controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const query = `
      SELECT u.id_usuario, p.email, u.contrasena_hash 
      FROM Personas p 
      INNER JOIN Usuarios u ON p.id_persona = u.id_persona 
      WHERE p.email = ?`;

      const [results] = await db.query(query, [email]);
      console.log("Resultados de la consulta:", results);      

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.contrasena_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET no está definido en .env");
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    const token = jwt.sign(
      { id_usuario: user.id_usuario, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id_usuario: user.id_usuario, email: user.email } });
  } catch (err) {
    console.error('Error en loginUser:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { loginUser };