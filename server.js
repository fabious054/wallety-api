require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: process.env.HOST,     // ou o endereço do seu servidor MySQL
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //testar conexao
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      });
});


//LOGIN ROUTES
app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    //retorna os dados recebidos
    res.json({email, password});

});


//LOCALIZATIONS ROUTES
  //function to get all countries in DB
  app.get('/contries', (req, res) => {
      connection.query('SELECT * FROM si_countries', function (err, rows, fields) {
          if (err) throw err;
          res.json(rows);
      });
  });

  //function to get states by coutry id in DB
  app.get('/states/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM si_states WHERE id_country = ${id}`;
    // connection.query(query, function (err, rows, fields) {
    //     if (err) throw err;
    //     res.json
    //     (rows);
    // });
    return res.json({id, query});
  });


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});