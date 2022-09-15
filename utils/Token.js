const jwt = require('jsonwebtoken');

const signToken = async (data) => {
    const token = await jwt.sign(data, 'LoverPet', { expiresIn: '1h' });
    return token;
}

module.exports = {
    signToken
}
