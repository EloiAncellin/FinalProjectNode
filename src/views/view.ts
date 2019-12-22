const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/register', (req, res) => {
    res.render(path.join(__dirname, 'public/register/index.ejs'));
});

router.get('/login', (req, res) => {
    res.render(path.join(__dirname, 'public/login/index.ejs'));
});

router.get('/addMetric', (req, res) => {
	res.render(path.join(__dirname, 'public/addMetric/index.ejs'));
});

router.get('/metrics/:name', (req, res) => {
    res.render(path.join(__dirname, 'public/metric/index.ejs'), { metric: req.params.name });
});

router.get('/', (req, res) => {
    res.render(path.join(__dirname, 'public/home/index.ejs'));
});



export = router;
