const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const userController = require('../controller/user.controller');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/me', checkAuth, userController.me);

module.exports = router;