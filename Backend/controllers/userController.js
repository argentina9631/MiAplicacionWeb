// backend/controllers/userController.js
const crypto = require('crypto'); // Importa crypto para manejar SHA-256
const jwt = require('jsonwebtoken'); // Importa jwt para generar el token
const pool = require('../config/db'); // Ajusta la ruta según tu estructura de carpetas

const login = async (req, res) => {
  console.log("Request body recibido:", req.body); // Log para depuración
  const { email, password } = req.body;

  // Validar datos obligatorios
  if (!email || !password) {
    console.error("Faltan datos obligatorios en el request");
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    const query = `
      SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.id_persona, p.nombre_persona, p.email
      FROM Usuarios u
      JOIN Personas p ON u.id_persona = p.id_persona
      WHERE p.email = ?
    `;

    console.log('Ejecutando consulta SQL:', query); // Log para depuración
    const [result] = await pool.query(query, [email]);

    console.log('Resultados obtenidos de la consulta:', result); // Log para ver los resultados

    // Verificar si se encontró el usuario
    if (result.length === 0) {
      console.warn("Usuario no encontrado con el email proporcionado");
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    const user = result[0];
    console.log("Usuario encontrado:", user); // Log del usuario encontrado

    // Generar el hash de la contraseña ingresada con SHA-256
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    console.log("Hash generado para la contraseña ingresada:", hashedPassword);

    // Comparar el hash generado con el almacenado en la base de datos
    if (hashedPassword !== user.contrasena_hash) {
      console.warn("Contraseña incorrecta para el usuario proporcionado");
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    console.log("Login exitoso para el usuario:", user.nombre_persona);

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id_usuario, id_rol: user.id_rol },
      'clave_secreta', // Usa una clave secreta para firmar el token
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    // Responder con éxito y el token
    res.status(200).json({
      message: 'Login exitoso',
      token, // Devuelve el token JWT
      user: {
        id_usuario: user.id_usuario,
        nombre_usuario: user.nombre_usuario,
        nombre_persona: user.nombre_persona,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Error al procesar el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  login,
};

