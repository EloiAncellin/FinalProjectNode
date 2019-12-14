const auth = require('./controllers/auth');
const userController = require('./controllers/user');
const metricController = require('./controllers/metric');
const express = require('express');
const router = express.Router();

router.post('/users/register', userController.create);
router.post('/users/authenticate', userController.authenticate);
router.get('/users/me', auth.ensureAuthenticated, userController.getPersonalDetails);

router.get('/metrics', auth.ensureAuthenticated, metricController.getNames);
router.get('/metrics/:name', auth.ensureAuthenticated, metricController.getByName);
router.post('/metrics', auth.ensureAuthenticated, metricController.create);
router.put('/metrics', auth.ensureAuthenticated, metricController.updateById);

export = router;
