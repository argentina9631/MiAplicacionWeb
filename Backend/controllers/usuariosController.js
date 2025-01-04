const db = require('../db'); // Conexión a la base de datos
const bcrypt = require('bcryptjs'); // Para la encriptación de contraseñas

// Función para obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Función para obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el usuario');
  }
};

// Función para crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  const { email, password, nombre, rol } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el usuario en la base de datos
    const [result] = await db.execute(
      'INSERT INTO Usuarios (email, password, nombre) VALUES (?, ?, ?)',
      [email, hashedPassword, nombre]
    );

    // Asignar el rol al usuario
    await db.execute(
      'INSERT INTO UsuarioRol (usuario_id, rol_id) VALUES (?, ?)',
      [result.insertId, rol]
    );

    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
};

// Función para actualizar un usuario
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, password, nombre, rol } = req.body;

  try {
    // Encriptar la nueva contraseña si se ha proporcionado
    let updatedPassword = password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Actualizar los datos del usuario
    await db.execute(
      'UPDATE Usuarios SET email = ?, password = ?, nombre = ? WHERE id = ?',
      [email, updatedPassword, nombre, id]
    );

    // Actualizar el rol
    await db.execute(
      'UPDATE UsuarioRol SET rol_id = ? WHERE usuario_id = ?',
      [rol, id]
    );

    res.send('Usuario actualizado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el usuario');
  }
};

// Función para eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar el rol del usuario
    await db.execute('DELETE FROM UsuarioRol WHERE usuario_id = ?', [id]);

    // Eliminar el usuario de la base de datos
    await db.execute('DELETE FROM Usuarios WHERE id = ?', [id]);

    res.send('Usuario eliminado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario');
  }
};
