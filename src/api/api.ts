const auth = require('./controllers/auth');
const userController = require('./controllers/user');
const express = require('express');
const router = express.Router();

router.post('/users/register', userController.create);
router.post('/users/authenticate', userController.authenticate);
router.get('/users', auth.ensureAuthenticated, userController.getPersonalDetails);

export = router;
