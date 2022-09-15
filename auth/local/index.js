const { Router } = require('express');
const router = Router();

const {
    registerHandler
} = require('./auth.controller')

router.post('/register', registerHandler);

module.exports = router;
