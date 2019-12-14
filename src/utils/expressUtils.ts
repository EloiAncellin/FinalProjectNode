const bodyParser = require('body-parser');
const express = require('express');
const colors = require('colors/safe');
const app = express();

colors.enable();
let _server;

const cheezyLog = () => {
    console.log(colors.brightMagenta.bold('===  cheezy log activated  ==='));
    console.log(colors.brightGreen.bold('Congratulation! You made it so far, wow! The server is now up and running :)'));
    console.log(colors.brightYellow.underline(`http://localhost:${_server.address().port}`));
    console.log(colors.bold('Please rate this project 💯'));
    console.log(colors.brightCyan.bold('Goodbye friend.'));
    console.log(colors.brightMagenta.bold('=== cheezy log deactivated ==='));
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
