import api from '../services/api/users';
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    api.getUserByEmail('aflakomar@gmail.com').then((user) => {
        res.json(user);
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;
