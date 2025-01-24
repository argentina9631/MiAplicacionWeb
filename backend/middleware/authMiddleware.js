// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  // Obtener el token del header Authorization
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  // Verificar el token con la clave secreta desde las variables de entorno
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    // Almacenar los datos decodificados del token en el objeto `req` para su uso posterior
    req.usuarioId = decoded.userId; // Asumiendo que `userId` es lo que contiene el token
    req.rolId = decoded.roleId; // Asumiendo que `roleId` es lo que contiene el token

    next(); // Pasar al siguiente middleware o ruta
  });
};

module.exports = { verificarToken };
