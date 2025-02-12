// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Controlador para el login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Consulta al campo correcto en la tabla Personas
    const query = 'SELECT * FROM Personas INNER JOIN Usuarios ON Personas.id = Usuarios.personaId WHERE Personas.email = ?';
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Resto del controlador omitido para mantener esto legible
module.exports = { loginUser };
