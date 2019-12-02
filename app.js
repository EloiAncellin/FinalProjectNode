require('dotenv').config()
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

MongoClient.connect(new Server(host, port), function(err, client) {
    if (err) throw err;
    var db = client.db(name);

    app.get('/', (req, res) => {
        db.collection('users').insertOne({ 'name': 'omar aflak' }, function(err, result){
            if (err) res.send('oups...')
            db.collection('users').findOne({}, function(err, result){
                if (err) res.send('oups...')
                res.send(JSON.stringify(result))
            });
        });
    })

    const web_port = process.env.WEB_PORT
    app.listen(web_port, () => console.log(`Example app listening on port ${web_port}!`))
});
