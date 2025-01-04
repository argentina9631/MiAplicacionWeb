const bcrypt = require('bcryptjs');

// Cambia esta contraseña por la que quieras hashear
const password = 'miPasswordSeguro';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
  } else {
    console.log('Contraseña hasheada:', hash);
  }
});
