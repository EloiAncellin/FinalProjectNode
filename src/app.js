require('custom-env').env(process.env.APP_ENV);
const utils = require('./utils/mongoUtils');
const express = require('express');
const app = express();

utils.connectToDatabase(function(err, db) {
    if (err) throw err;
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
