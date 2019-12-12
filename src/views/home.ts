import api from '../services/api/users';
import User from '../models/user';
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    api.getUserByEmail('aflakomar@gmail.com').then((user) => {
        res.json(user);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/create', function (req, res) {
    const user = new User(null, 'omaraflak@gmail.com', 'pass', 'Omar', 'Aflak');
    api.createUser(user).then((user) => {
        res.json(user);
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;
