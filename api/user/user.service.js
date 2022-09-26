const User = require('./user.model.js');

const createUser = (data) => User.create(data);
const findUserByEmail = (email) => User.findOne({ email });
const findUserById = (id) => User.findById(id);
const updateUserById = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
const deleteUserById = (id) => User.findByIdAndRemove(id);

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    updateUserById,
    deleteUserById
}
