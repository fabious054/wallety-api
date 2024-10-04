const express = require('express');
const DB = require('./services/dbControl');
const BCRYPT = require('./services/bcrypt');
const UTILS = require('./functions/util');
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
    router.post('/user', asyncHandler(async(req, res) => {
        const { name,lastname,username,email,born,id_country,id_state,id_city,password } = req.body;
        
        //verifica se todos os campos foram preenchidos
        if(!name || !lastname || !username || !email || !born || id_country == 'undefined' || id_state == 'undefined' || id_city == 'undefined' || !password){
            res.status(400).json({message: 'All fields are required',fields: 'name,lastname,username,email,born,id_country,id_state,id_city,password'});
            return;
        }
        
        const createdTime = UTILS.getCurrentTime();

        // HASH PASSWORD
        const hashedPassword = await BCRYPT.encryptPassword(password);

        res.json({ name,lastname,username,email,born,id_country,id_state,id_city,hashedPassword ,createdTime});
    }));

// ####################################################################################################################################################################################################################################################################################################

module.exports = router;
