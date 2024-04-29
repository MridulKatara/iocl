const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const authenticateAdmin = require('../middleware/authenticateAdmin');

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/worker', authenticateAdmin, userController.getWorkers);

module.exports = router;
