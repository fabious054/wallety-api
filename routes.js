const express = require('express');
const DB = require('./dbControl');
const router = express.Router();

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// LOGIN ROUTES ##################################################################################################################################################
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ email, password });
});

// LOCALIZATIONS ROUTES ##################################################################################################################################################
    // GET COUNTRIES
    router.get('/countries', asyncHandler(async (req, res) => {
        const query = 'SELECT * FROM si_countries';
        const countries = await DB.executeQuery(query);
        res.json(countries);
    }));

    // GET STATES BY COUNTRY
    router.get('/states/:id',asyncHandler( async (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM si_states WHERE id_country = ${id}`;
        const states = await DB.executeQuery(query);
        res.json(states);
    }));

    // GET CITIES BY STATE
    router.get('/cities/:id', asyncHandler( async (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM si_cities WHERE id_state = ${id}`;
        const cities = await DB.executeQuery(query);
        res.json(cities);
    }));

//##################################################################################################################################################
module.exports = router;
