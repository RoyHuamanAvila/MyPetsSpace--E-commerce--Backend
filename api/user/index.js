const { Router } = require('express');

const {
    updateUserHandler, deleteUserHandler
} = require('./user.controller');

const {
    isAuthenticated
} = require('../../auth/local/auth.controller');

const router = Router();

router.patch('/update', isAuthenticated, updateUserHandler);
router.delete('/delete', isAuthenticated, deleteUserHandler);

module.exports = router;
