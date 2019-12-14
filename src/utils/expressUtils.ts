const bodyParser = require('body-parser');
const express = require('express');
const app = express();

let _server;

export = {
    start: () => {
        return new Promise((resolve, reject) => {
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());

            app.use('/', require('../views/home'));
            app.use('/api', require('../api/api'));

            _server = app.listen(process.env.WEB_PORT, () => {
                resolve(app);
                console.log(`Server listening on port ${_server.address().port}!`);
            });
        });
    },
    stop: () => {
        _server.close();
    },
    getApp: () => {
        return app;
    }
};
