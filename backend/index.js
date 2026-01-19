const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost', // Dirección del servidor MySQL
    user: 'root', // Usuario de MySQL
    port: '3307',
    password: '', // Contraseña de MySQL
    database: 'eduelorrieta', // Nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Endpoints CRUD
//-----GET-----//
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/tipos', (req, res) => {
    const query = 'SELECT * FROM tipos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/reuniones', (req, res) => {
    const query = 'SELECT * FROM reuniones';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/modulos', (req, res) => {
    const query = 'SELECT * FROM modulos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/matriculaciones', (req, res) => {
    const query = 'SELECT * FROM matriculaciones';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/horarios', (req, res) => {
    const query = 'SELECT * FROM horarios';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/ciclos', (req, res) => {
    const query = 'SELECT * FROM ciclos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//-----INSERT-----//

app.post('/users', (req, res) => {
    const newItem = req.body;
    delete newItem.id; 
    const query = 'INSERT INTO users SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) {
            // 🛑 ESTO EVITA QUE SE CIERRE EL SERVIDOR
            console.error("❌ Error SQL:", err.sqlMessage); // Muestra el error en la terminal
            return res.status(500).json({ error: err.sqlMessage }); // Avisa a Angular
        }
        
        // Si todo va bien
        res.send({ id: results.insertId, ...newItem });
    });
});
app.post('/reuniones', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO reuniones SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.post('/modulos', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO modulos SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});
app.post('/matriculaciones', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO matriculaciones SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.post('/horarios', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO horarios SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});



//-----UPDATE-----//
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/reuniones/:id_reunion', (req, res) => {
    const { id_reunion } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE reuniones SET ? WHERE id_reunion = ?';
    db.query(query, [updatedItem, id_reunion], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/amigos/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE amigos SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/modulos/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE modulos SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.put('/matriculaciones/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE matriculaciones SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/horarios/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE horarios SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//-----DELETE-----//
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/reuniones/:id_reunion', (req, res) => {
    const { id_reunion } = req.params;
    const query = 'DELETE FROM reuniones WHERE id_reunion = ?';
    db.query(query, [id_reunion], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/matriculaciones/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM matriculaciones WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/horarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM horarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


//-----GET BY ID-----//

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/tipos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tipos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/reuniones/:id_reunion', (req, res) => {
    const { id_reunion } = req.params;
    const query = 'SELECT * FROM reuniones WHERE id_reunion = ?';
    db.query(query, [id_reunion], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/matriculaciones/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM matriculaciones WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/horarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM horarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/ciclos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM ciclos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

