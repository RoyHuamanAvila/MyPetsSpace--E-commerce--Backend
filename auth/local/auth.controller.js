const {
    createUser,
    findUserById,
    findUserByEmail,
    updateUserById,
    deleteUserById
} = require('../../api/user/user.service');

const { encryptPassword, comparePassword } = require('../../utils/Encrypt');
const { signToken } = require('../../utils/Token');

const registerHandler = async (req, res) => {
    const { name, lastname, userType, email, password } = req.body;
    const passwordEncrypt = await encryptPassword(password);

    try {
        const newUser = await createUser({ name, lastname, userType, email, password: passwordEncrypt });
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await findUserByEmail(email);
        if (!userFound) return res.status(404).json({ message: 'User not found' });

        const passwordMatch = await comparePassword(password, userFound.password);

        if (!passwordMatch) return res.status(403).json({ message: 'Wrong credentials' })

        const token = await signToken({ email });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    registerHandler,
    loginHandler
}
