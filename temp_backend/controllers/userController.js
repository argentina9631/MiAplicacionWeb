// backend/controllers/userController.js
const crypto = require('crypto');
const connection = require('../config/db');

const login = (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const query = 'SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.id_persona, p.nombre_persona, p.email FROM Usuarios u JOIN Personas p ON u.id_persona = p.id_persona WHERE p.email = ?';

  connection.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error al consultar el usuario' });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    const user = result[0];
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if (hash !== user.contrasena_hash) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Login exitoso', user });
  });
};

module.exports = { login };