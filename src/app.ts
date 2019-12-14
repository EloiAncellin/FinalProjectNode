require('custom-env').env(process.env.APP_ENV);
const mongoUtils = require('./utils/mongoUtils');
const expressUtils = require('./utils/expressUtils');

mongoUtils.connect()
.then(expressUtils.start).catch((err) => {
    throw err;
});

export = {};
