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

// ####################################################################################################################################################################################################################################################################################################

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


// USER ROUTES ##################################################################################################################################################
// CREATE NEW USER
router.post('/user', (req, res) => {
    const { name,lastname,username,email,born,id_country,id_state,id_city,password } = req.body;
    //hora de agora
    const createdTime = new Date().toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // JUST TU USE 24H FORMAT
    });


    res.json({ name,lastname,username,email,born,id_country,id_state,id_city,password ,createdTime});
});

// ####################################################################################################################################################################################################################################################################################################





module.exports = router;
