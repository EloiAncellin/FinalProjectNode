require('custom-env').env(process.env.APP_ENV);
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

var _db;

module.exports = {
    connectToDatabase: function(callback) {
        MongoClient.connect(new Server(host, port), function(err, client) {
            if (err) {
                callback(err);
            } else {
                _db = client.db(name);
                callback(false, _db);
            }
        });
    },
    db: function() {
        return _db;
    }
};
