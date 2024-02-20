const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3300;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db_mayoresapp'
});
connection.connect();

app.get('/registrationrequests', (req, res) => {
    connection.query('SELECT * FROM `registrationrequests`', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/registrationrequest', (req, res) => {
    const id = parseInt(req.query.id);
    const password = req.query.password;
    connection.query(`SELECT * FROM registrationrequests WHERE RequestID = ${id} AND Password LIKE '${password}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows[0]);
    });
});

app.post('/registrationrequest', (req, res) => {
    const { username, email, password } = req.body;
    // Asegúrate de que los datos requeridos estén presentes
    if (!username || !email || !password) {
        return res.status(400).send('Faltan datos requeridos');
    }

    // Conecta con la base de datos y realiza la inserción de datos
    connection.query(
        `INSERT INTO registrationrequests (Username, Email, Password) VALUES ('${username}', '${email}', '${password}')`,
        (err, results) => {
            if (err) {
                console.error('Error al insertar en la base de datos:', err);
                return res.status(500).send('Error en la creación de la cuenta');
            }
            res.status(200).send('Cuenta creada exitosamente');
        }
    );
});

app.post('/registrationrequest', (req, res) => {
    const { username, password } = req.body;
    // Verificar si los campos requeridos están presentes
    if (!username || !password) {
        return res.status(400).send('Faltan datos requeridos');
    }

    // Consultar la base de datos para verificar las credenciales del usuario
    connection.query(
        `SELECT * FROM registrationrequests WHERE Username = '${username}' AND Password = '${password}'`,
        (err, results) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return res.status(500).send('Error en la solicitud');
            }

            // Verificar si se encontró un usuario con las credenciales proporcionadas
            if (results.length === 1) {
                // Usuario autenticado, devolver el usuario como respuesta
                res.status(200).send(results[0]);
            } else {
                // Credenciales incorrectas, devolver un mensaje de error
                res.status(401).send('Credenciales incorrectas');
            }
        }
    );
});

app.post('/registrationrequest', (req, res) => {
    
    const { nombre, telefono, email, usuarioId } = req.body;
    if (!nombre || !telefono) {
      return res.status(400).send('Nombre y Teléfono son campos requeridos');
    }
  
    connection.query(
      'INSERT INTO familiares (Nombre, Telefono, Email, UsuarioID) VALUES (?, ?, ?, ?)',
      [nombre, telefono, email, usuarioId],
      (err, results) => {
        if (err) {
          console.error('Error al insertar en la base de datos:', err);
          return res.status(500).send('Error en la creación del familiar');
        }
        res.status(200).send('Familiar agregado exitosamente');
      }
    );
});

  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

