require('dotenv').config();
const colors = require('colors/safe');
const mongoUtils = require('../dist/utils/mongoUtils');

mongoUtils.connect().then(() => {
    mongoUtils.clear();
    mongoUtils.close();
    console.log(colors.bold.brightYellow('Database cleared.'));
}).catch((err) => {
    throw err;
});

export = {};
