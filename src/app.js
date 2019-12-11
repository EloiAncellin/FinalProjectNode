require('custom-env').env(process.env.APP_ENV);
var utils = require('./utils/mongoUtils');
var express = require('express');
var app = express();
utils.connectToDatabase(function (err, db) {
    if (err)
        throw err;
    app.get('/', function (req, res) {
        db.collection('users').insertOne({ 'name': 'omar aflak' }, function (err, result) {
            if (err)
                res.send('oups...');
            db.collection('users').findOne({}, function (err, result) {
                if (err)
                    res.send('oups...');
                res.send(JSON.stringify(result));
            });
        });
    });
    var web_port = process.env.WEB_PORT;
    app.listen(web_port, function () { return console.log("Example app listening on port " + web_port + "!"); });
});
