const mongoose = require('mongoose');
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

let _db;

export = {
    connect: function() {
        return mongoose.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true, useUnifiedTopology: true });
    },
    clear: function() {
        return mongoose.connection.db.dropDatabase();
    },
    close: function() {
        mongoose.connection.close();
    }
};
