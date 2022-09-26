const {
    createUser,
    findUserByEmail,
} = require('../../api/user/user.service.js');

const { encryptPassword, comparePassword } = require('../../utils/Encrypt.js');
const { signToken, verifyToken } = require('../../utils/Token.js');

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

const isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    try {
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];

            const data = await verifyToken(token);

            if (!data) {
                return res.status(401).json({ message: 'Unathorized' });
            }

            const { email } = data;
            const user = await findUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = user;

            next();
        } else {
            res.status(403).json({ message: 'Enter valid token' });
        }


    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = {
    registerHandler,
    loginHandler,
    isAuthenticated
}
