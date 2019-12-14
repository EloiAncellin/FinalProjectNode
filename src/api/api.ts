const auth = require('./controllers/auth');
const userController = require('./controllers/user');
const metricController = require('./controllers/metric');
const express = require('express');
const router = express.Router();

router.post('/users/register', userController.create);
router.post('/users/authenticate', userController.authenticate);
router.get('/users/me', auth.ensureAuthenticated, userController.getPersonalDetails);

router.post('/metrics', auth.ensureAuthenticated, metricController.create);
router.get('/metrics/:name', auth.ensureAuthenticated, metricController.getByName);
router.get('/metrics', auth.ensureAuthenticated, metricController.getNames);

export = router;
