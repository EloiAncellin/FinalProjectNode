require('custom-env').env(process.env.APP_ENV);
import mongoUtils from './utils/mongoUtils';
const express = require('express');
const app = express();

mongoUtils.connect().then(mongoUtils.clear).then(mongoUtils.init).then((res) => {
    const web_port = process.env.WEB_PORT
    app.use('/', require('./views/home'));
    app.listen(web_port, () => console.log(`Server listening on port ${web_port}!`));
}).catch((err) => {
    throw err;
});
