// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { permisos } = require('../config/roles');

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extraer el token
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Usar JWT_SECRET del archivo .env
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        req.usuarioId = decoded.id;
        req.rolId = decoded.id_rol;
        next();
    });
};

const verificarPermiso = (ruta) => {
    return (req, res, next) => {
        const permisosUsuario = permisos[req.rolId] || [];
        if (permisosUsuario.includes(ruta)) {
            next();
        } else {
            res.status(403).json({ mensaje: 'Acceso denegado' });
        }
    };
};

module.exports = { verificarToken, verificarPermiso };
