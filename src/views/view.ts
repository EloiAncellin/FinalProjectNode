const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login/index.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/logout/index.html'));
});

router.get('/hello', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/hello/index.html'));
});

export = router;
