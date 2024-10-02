require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',     // ou o endereço do seu servidor MySQL
    user: 'root',
    password: 'root',
    database: 'test'
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log('Página inicial acessada');
    //testar conexao
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      });
});

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    //retorna os dados recebidos
    res.json({email, password});

});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});