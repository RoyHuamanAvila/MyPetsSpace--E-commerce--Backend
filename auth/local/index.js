const { Router } = require('express');
const router = Router();

const {
    registerHandler,
    loginHandler
} = require('./auth.controller.js')

router.post('/register', registerHandler);
router.post('/login', loginHandler);

module.exports = router;
