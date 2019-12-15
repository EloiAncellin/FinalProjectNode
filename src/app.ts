require('dotenv').config();
const mongoUtils = require('./utils/mongoUtils');
const expressUtils = require('./utils/expressUtils');

mongoUtils.connect().then(() => {
    return expressUtils.start();
}).catch((err) => {
    throw err;
});

export = {};
