const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db_mayoresapp'
});
connection.connect();

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Faltan datos requeridos');
    }

    connection.query(
        `INSERT INTO users (Username, Email, Password, IsEmailConfirmed) VALUES (?, ?, ?, 1)`,
        [username, email, password],
        (err, results) => {
            if (err) {
                console.error('Error al insertar en la base de datos:', err);
                return res.status(500).send('Error en la creación de la cuenta');
            }
            res.status(200).send('Cuenta creada exitosamente');
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Faltan datos requeridos');
    }

    connection.query(
        `SELECT * FROM users WHERE Username = ? AND Password = ?`,
        [username, password],
        (err, results) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return res.status(500).send('Error en la solicitud');
            }

            if (results.length === 1) {
                res.status(200).send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

