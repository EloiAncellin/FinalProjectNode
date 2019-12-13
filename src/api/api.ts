const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');

router.post('/users/register', userController.create);
router.post('/users/authenticate', userController.authenticate);

export = router;
