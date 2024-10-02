require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
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


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});