const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

let _client;
let _db;

export = {
    connect: function(callback) {
        MongoClient.connect(new Server(host, port), function(err, client) {
            if (err) {
                callback(err);
            } else {
                _client = client;
                _db = client.db(name);
                callback(undefined, _db);
            }
        });
    },
    db: function() {
        return _db;
    },
    close: function() {
        _client.close();
    }
};
