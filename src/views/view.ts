const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login/index.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/logout/index.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home/index.html'));
});

export = router;
