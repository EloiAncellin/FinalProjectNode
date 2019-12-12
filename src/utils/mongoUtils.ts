const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

let _client;
let _db;

export = {
    connect: function() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(new Server(host, port)).then((client) => {
                _client = client;
                _db = client.db(name);
                resolve(_db);
            }).catch(reject);
        });
    },
    db: function() {
        return _db;
    },
    close: function() {
        _client.close();
    },
    clear: function() {
        return new Promise((resolve, reject) => {
            _db.dropDatabase().then((result) => {
                if (result) {
                    resolve(true);
                } else {
                    reject('Could not drop database.');
                }
            }).catch(reject);
        });
    },
    init: function() {
        _db = _client.db(name);
        return _db.collection('users').createIndex( { "email": 1 }, { unique: true } );
    }
};
