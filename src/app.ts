require('custom-env').env(process.env.APP_ENV);
import utils from './utils/mongoUtils';
const express = require('express');
const app = express();

utils.connectToDatabase(function(err, db) {
    if (err) throw err;

    app.use('/', require('./views/home'));

    const web_port = process.env.WEB_PORT
    app.listen(web_port, () => console.log(`Server listening on port ${web_port}!`))
});
