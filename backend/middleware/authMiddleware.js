// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.header('Authorization');
  console.log("Token recibido para protección:", token);

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = { protect };