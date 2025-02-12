// userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { pool } = require('../config/db'); // Asegúrate de tener la conexión de la base de datos aquí

dotenv.config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const verifyToken = (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    res.json({ message: 'Token verificado', userId: decoded.userId });
  });
};

module.exports = { loginUser, verifyToken };
