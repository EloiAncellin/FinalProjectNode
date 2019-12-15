const mongoose = require('mongoose');
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const hostTravis = process.env.DB_HOST_TRAVIS;
const nameTest = process.env.DB_NAME_TEST;
const isTravis = process.env.TRAVIS;

export = {
    connect: function(isTest) {
        const db = isTest ? nameTest : name;
        const address = isTravis == '1' ? hostTravis : host;
        return mongoose.connect(`mongodb://${address}:${port}/${db}`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    clear: function() {
        return mongoose.connection.db.dropDatabase();
    },
    close: function() {
        mongoose.connection.close();
    }
};
