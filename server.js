require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes); // Usando as rotas
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
