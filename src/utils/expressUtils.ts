const bodyParser = require('body-parser');
const express = require('express');
const colors = require('colors/safe');
const app = express();

colors.enable();
let _server;

const cheezyLog = () => {
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

export = {
    start: () => {
        return new Promise((resolve, reject) => {
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());

            app.use('/', require('../views/home'));
            app.use('/api', require('../api/api'));

            _server = app.listen(process.env.WEB_PORT, () => {
                if (process.env.VERBOSE == '1') {
                    cheezyLog();
                }
                resolve(app);
            });
        });
    },
    stop: () => {
        _server.close();
    }
};
