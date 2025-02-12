// Nombre del archivo original: userController.js
const db = require('../config/db'); // Importación correcta
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = `SELECT * FROM Personas WHERE email = ?`;

  // Asegurando que db.query esté definido
  if (!db || typeof db.query !== 'function') {
    console.error('Error en la conexión a la base de datos');
    return res.status(500).json({ message: 'Error interno del servidor' });
  }

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err.message);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: 'Email o contraseña incorrectos' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, email: user.email } });
    });
  });
};

module.exports = { loginUser };
