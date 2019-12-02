const express = require('express');
const app = express();
const port = 8080;

const MongoClient = require('mongodb').MongoClient;
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

MongoClient.connect('mongodb://mongodb:27017/', function(err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
