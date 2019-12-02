require('dotenv').config()
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
var dbo;

app.get('/', (req, res) => {
    dbo.collection('users').insertOne({ 'name': 'omar aflak' }, function(err, result){
        if (err) res.send('oups...')
        dbo.collection('users').findOne({}, function(err, result){
            if (err) res.send('oups...')
            res.send(JSON.stringify(result))
        });
    });
})

MongoClient.connect(new Server(process.env.DB_HOST, process.env.DB_PORT), function(err, db) {
    if (err) throw err;
    dbo = db.db(process.env.DB_NAME);
    var port = process.env.WEB_PORT;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
