var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var host = process.env.DB_HOST;
var port = process.env.DB_PORT;
var name = process.env.DB_NAME;
var _client;
var _db;
module.exports = {
    connectToDatabase: function (callback) {
        MongoClient.connect(new Server(host, port), function (err, client) {
            if (err) {
                callback(err);
            }
            else {
                _client = client;
                _db = client.db(name);
                callback(undefined, _db);
            }
        });
    },
    db: function () {
        return _db;
    },
    closeDatabase: function () {
        _client.close();
    }
};
