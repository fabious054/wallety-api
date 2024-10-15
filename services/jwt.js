const jwt = require('jsonwebtoken');

// TOKEN GENERATOR
function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        born: user.born,
        id_country: user.id_country,
        id_state: user.id_state,
        id_city: user.id_city
    };

    const token = jwt.sign(payload, 'seuSegredoSuperSecreto', { expiresIn: '24h' }); 
    return token;
}

function verifyToken(token) {
    //remove Bearer from token
    token = token.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'seuSegredoSuperSecreto');
        return decoded; // Retorna os dados decodificados (ex: id, email)
    } catch (err) {
        return null; // Retorna null se o token for inválido ou expirado
    }
}

module.exports = {
    generateToken,
    verifyToken
};
