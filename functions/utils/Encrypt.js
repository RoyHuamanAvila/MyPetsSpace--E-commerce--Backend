const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password, passwordDB) => {
    return await bcrypt.compare(password, passwordDB);
}

module.exports = {
    encryptPassword,
    comparePassword
}
