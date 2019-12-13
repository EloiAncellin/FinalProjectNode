require('custom-env').env(process.env.APP_ENV);
import mongoUtils from './utils/mongoUtils';
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

mongoUtils.connect().then(mongoUtils.clear).then(() => {
    // parse data in body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // routes
    app.use('/', require('./views/home'));
    app.use('/api', require('./api/api'));

    // start server
    const server = app.listen(process.env.WEB_PORT, () => {
        console.log(`Server listening on port ${server.address().port}!`)
    });
}).catch((err) => {
    throw err;
});
