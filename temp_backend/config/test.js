//backend/test.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'b8biz3pozkccjo4cgtlo-mysql.services.clever-cloud.com',
  user: 'umjqezvfshle1hsn',
  password: 'Jk4asxYTAhD8hd367zgo',
  database: 'b8biz3pozkccjo4cgtlo'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  
  console.log('Conexión exitosa a la base de datos');

  connection.query('SELECT * FROM Usuarios LIMIT 5', (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      console.log('Usuarios encontrados:', results);
    }
    connection.end();
  });
});
