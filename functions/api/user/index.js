const { Router } = require('express');

const {
    updateUserHandler, deleteUserHandler, findUserByIdHandler
} = require('./user.controller.js');

const {
    isAuthenticated
} = require('../../auth/local/auth.controller.js');

const router = Router();

router.get('/:id', findUserByIdHandler);
router.patch('/update', isAuthenticated, updateUserHandler);
router.delete('/delete', isAuthenticated, deleteUserHandler);

module.exports = router;
