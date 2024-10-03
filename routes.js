const express = require('express');
const DB = require('./dbControl');
const router = express.Router();

// LOGIN ROUTES
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ email, password });
});

// LOCALIZATIONS ROUTES
router.get('/countries', async (req, res) => {
    try {
        const countries = await DB.executeQuery('SELECT * FROM si_countries');
        res.json(countries);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar países' });
    }
});

router.get('/states/:id', async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM si_states WHERE id_country = ${id}`;
    
    try {
        const states = await DB.executeQuery(query, [id]);
        res.json(states);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar estados' });
    }
});

module.exports = router;
