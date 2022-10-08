const {
    updateUserById,
    deleteUserById,
    findUserById
} = require('./user.service.js');

const findUserByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await findUserById(id);

        if (!userFound) return res.status(404).json({ message: 'user not found' });
        return res.status(201).json(userFound);
    } catch (error) {
        return res.status(500).json(error);

    }
}

const updateUserHandler = async (req, res) => {
    try {
        const user = req.user;
        const data = req.body;

        if (!user) return res.status(404).json({ message: 'user not found' });

        const userUpdated = await updateUserById(user._id, data);

        return res.status(200).json(userUpdated)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteUserHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ message: 'user not found' });

        const userDeleted = await deleteUserById(user._id);

        return res.status(200).json({ message: 'User deleted', userDeleted });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    updateUserHandler,
    deleteUserHandler,
    findUserByIdHandler
}
