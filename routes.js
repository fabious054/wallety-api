const express = require('express');
const DB = require('./services/dbControl');
const BCRYPT = require('./services/bcrypt');
const UTILS = require('./functions/util');
const JWT = require('./services/jwt');
const router = express.Router();

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// LOGIN ROUTES ##################################################################################################################################################
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(400).json({message: 'Username and password are required'});
        return;
    }

    const findEmailQuery = `SELECT * FROM si_users WHERE username = '${username}'`;
    DB.executeQuery(findEmailQuery)
        .then(async (result) => {
            if(result.length === 0){
                res.status(404).json({message: 'User not found',status: 404});
                return;
            }
            const user = result[0];
            const passwordMatch = await BCRYPT.comparePassword(password, user.password);
            if(!passwordMatch){
                res.status(401).json({message: 'Invalid password',status: 401});
                return;
            }
           const token = user.token;
           
              delete user.password;

            res.json({status: 200, message: 'Login successful', token,data:user});
        })
        .catch((error) => {
            res.status(500).json({message: 'Error logging in', error,status: 500});
        });
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
        
        if(!name || !lastname || !username || !email || !born || id_country == 'undefined' || id_state == 'undefined' || id_city == 'undefined' || !password){
            res.status(400).json({message: 'All fields are required',fields: 'name,lastname,username,email,born,id_country,id_state,id_city,password'});
            return;
        }
        const checkData = await DB.checkDataUser(email, username);
        if(checkData.emailExists || checkData.usernameExists){
            res.status(400).json({message: 'Email or username already exists', emailExists: checkData.emailExists, usernameExists: checkData.usernameExists});
            return;
        }
        const createdTime = UTILS.getCurrentTime();
        const hashedPassword = await BCRYPT.encryptPassword(password);

        const query = `INSERT INTO si_users (name, lastname, username, email, born, id_country, id_state, id_city, password, created) VALUES ('${name}', '${lastname}', '${username}', '${email}', '${born}', ${id_country}, ${id_state}, '${id_city}', '${hashedPassword}', '${createdTime}')`;
        const result = await DB.executeQuery(query);

        if(result.affectedRows === 0){
            res.status(500).json({message: 'Error creating user'});
            return;
        }

        const token = JWT.generateToken({id: result.insertId, email});
        //atualizar o token no banco de dados
        const updateTokenQuery = `UPDATE si_users SET token = '${token}' WHERE id = ${result.insertId}`;
        await DB.executeQuery(updateTokenQuery);

        res.json({message: 'User created successfully', token});
    }));

// ####################################################################################################################################################################################################################################################################################################

module.exports = router;
