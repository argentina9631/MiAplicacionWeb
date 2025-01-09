// backend/config/roles.js
const roles = {
    ADMINISTRADOR: 1,
    DUEÑO: 2,
    SUPERVISOR: 3,
    RECEPCIONISTA: 4,
    CLIENTE: 5,
};

const permisos = {
    [roles.ADMINISTRADOR]: ['dashboard', 'usuarios', 'reportes'],
    [roles.DUEÑO]: ['dashboard', 'inventario'],
    [roles.SUPERVISOR]: ['dashboard', 'tareas'],
    [roles.RECEPCIONISTA]: ['reservas'],
    [roles.CLIENTE]: ['perfil', 'reservas'],
};

module.exports = { roles, permisos };
