const crypto = require('crypto'); // Importa crypto para manejar SHA-256
const pool = require('../config/db'); // Ajusta la ruta según tu estructura de carpetas

const login = async (req, res) => {
  console.log("Request body:", req.body); // Para verificar los datos enviados
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Faltan datos obligatorios"); // Log adicional
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    const query = `
      SELECT u.id_usuario, u.nombre_usuario, u.contrasena_hash, p.id_persona, p.nombre_persona, p.email
      FROM Usuarios u
      JOIN Personas p ON u.id_persona = p.id_persona
      WHERE p.email = ?
    `;

    console.log('Consulta SQL ejecutada:', query); // Log de la consulta
    const [result] = await pool.query(query, [email]);

    console.log('Resultados de la consulta:', result); // Log de los resultados obtenidos

    if (result.length === 0) {
      console.log("Usuario no encontrado con el email proporcionado"); // Log adicional
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    const user = result[0];
    console.log("Usuario encontrado:", user); // Log para ver el usuario encontrado

    // Generar el hash de la contraseña ingresada con SHA-256
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (hashedPassword !== user.contrasena_hash) {
      console.log("Contraseña incorrecta"); // Log para contraseña no válida
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    console.log("Login exitoso"); // Log para login exitoso
    res.status(200).json({ message: 'Login exitoso', user });

  } catch (error) {
    console.error('Error capturado:', error); // Log para errores capturados
    res.status(500).json({ error: 'Error al consultar el usuario' });
  }
};

module.exports = {
  login,
};
