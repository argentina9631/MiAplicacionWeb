// backend/controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const query = 'SELECT * FROM Personas WHERE email = ?';
    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Error interno del servidor:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { loginUser };