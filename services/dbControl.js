const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// FUNCTION TO EXECUTE QUERIES
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const checkDataUser = async (email, username) => {
    const query = `SELECT email, username FROM si_users WHERE email = '${email}' OR username = '${username}'`;
    const result = await executeQuery(query);

    const userData = {
        emailExists: false,
        usernameExists: false,
    };

    if (result.length > 0) {
        // Verifica se o email existe no resultado
        if (result.some(user => user.email === email)) {
            userData.emailExists = true;
        }
        // Verifica se o username existe no resultado
        if (result.some(user => user.username === username)) {
            userData.usernameExists = true;
        }
    }

    return userData;
};

module.exports = {
    executeQuery,
    checkDataUser
};
