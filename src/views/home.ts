import api from '../services/api/users';
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    api.getUserByEmail('aflakomar@gmail.com', function(err, user) {
        if (err) {
            res.send('oups...');
        } else {
            res.json(user);
        }
    });
});

module.exports = router;
