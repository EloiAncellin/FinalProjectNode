const bodyParser = require('body-parser');
const express = require('express');
const colors = require('colors/safe');
const path = require('path');
const app = express();

let _server;

const cheezyLog = () => {
    if (process.env.VERBOSE == '1') {
        const logs = [
            colors.brightMagenta.bold('===  cheezy log activated  ==='),
            colors.brightGreen.bold('Congratulation! You made it so far, wow! The server is now up and running :)'),
            colors.brightYellow.underline(`http://localhost:${_server.address().port}`),
            colors.bold('Please rate this project 💯'),
            colors.brightCyan.bold('Goodbye friend.'),
            colors.brightMagenta.bold('=== cheezy log deactivated ===')
        ]
        console.log(logs.join('\n'));
    }
};

export = {
    start: (isTest) => {
        colors.enable();
        return new Promise((resolve, reject) => {
            app.engine('html', require('ejs').renderFile);
            app.set('view engine', 'html');
            app.set('views', path.join(__dirname, '../views/public'));

            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());

            app.use('/static', express.static(path.join(__dirname, '../views/public')));
            app.use('/', require('../views/view'));
            app.use('/api', require('../api/api'));

            const port = process.env.WEB_PORT;
            const portTest = process.env.WEB_PORT_TEST;
            const _port = isTest ? portTest : port;

            _server = app.listen(_port, () => {
                cheezyLog();
                resolve(app);
            });
        });
    },
    stop: () => {
        _server.close();
    }
};
