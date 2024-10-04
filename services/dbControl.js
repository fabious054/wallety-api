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


module.exports = {
    executeQuery
};
