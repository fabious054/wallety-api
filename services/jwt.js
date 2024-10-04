const jwt = require('jsonwebtoken');

// TOKEN GENERATOR
function generateToken(user) {
    
    const payload = {
        id: user.id,
        email: user.email
    };

    const token = jwt.sign(payload, 'seuSegredoSuperSecreto', { expiresIn: '24h' }); 
    return token;
}

function verifyToken(token) {
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
