const bcrypt = require('bcryptjs');


// FUNCTION TO ENCRYPT PASSWORD
async function encryptPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// FUNCTION TO COMPARE PASSWORD
async function comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}


module.exports = {
    encryptPassword,
    comparePassword
};
