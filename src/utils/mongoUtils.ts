const mongoose = require('mongoose');
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const nameTest = process.env.DB_NAME_TEST;

export = {
    connect: function(isTest) {
        const db = isTest ? nameTest : name;
        return mongoose.connect(`mongodb://${host}:${port}/${db}`, {
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
