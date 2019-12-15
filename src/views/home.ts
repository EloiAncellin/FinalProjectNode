const express = require('express');
const router = express.Router();
const auth = require('../api/controllers/auth');
// const Response = require('../api/models/response');
const userService = require('../services/user');

router.get('/', (req, res) => {
    res.send('Home page.');
});

router.get('/hello', auth.checkCookies, auth.ensureAuthenticated, (req, res) => {
    res.send('Secure page.');
});

router.get('/auth', (req, res) => {
    const cred = {
        email: 'toto01@ece.fr',
        password: 'toto01'
    };
    userService.authenticate(cred, (response) => {
        if (response.code === 200) {
            res.cookie('jwt', response.result.token, {
                httpOnly: true,
                secure: false // no ssl for now...
            });
        }
        res.status(response.code).json(response);
    });
});

module.exports = router;
