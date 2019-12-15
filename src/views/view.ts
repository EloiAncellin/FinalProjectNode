const express = require('express');
const router = express.Router();
const auth = require('../api/controllers/auth');
const Response = require('../api/models/response');
const userService = require('../services/user');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login/index.html'));
});

router.get('/hello', auth.checkCookies, auth.ensureAuthenticated, (req, res) => {
    res.send('Secure page.');
});

router.get('/bye', auth.checkCookies, auth.ensureAuthenticated, (req, res) => {
    res.clearCookie('jwt');
    res.send('Goodbye.');
});

router.get('/auth', (req, res) => {
    const cred = {
        email: 'toto01@ece.fr',
        password: 'toto01'
    };
    userService.authenticate(cred, (response) => {
        if (response.status === Response.SUCCESS) {
            res.cookie('jwt', response.result.token, {
                httpOnly: true,
                secure: false, // no ssl for now...
                maxAge: 60 * 60 * 24 * 7
            });
            res.send('You are logged in.');
        } else {
            res.status(response.code).json(response);
        }
    });
});

export = router;
