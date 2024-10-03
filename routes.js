const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// LOGIN ROUTES
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ email, password });
});

// LOCALIZATIONS ROUTES
router.get('/countries', (req, res) => {
    connection.query('SELECT * FROM si_countries', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/states/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM si_states WHERE id_country = ${id}`;
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

module.exports = router;
