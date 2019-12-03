require('custom-env').env(process.env.APP_ENV);
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const expect = require('chai').expect;
const sum = require('../utils/sum.js');
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const url = `mongodb://${host}:${port}`;

var client;
var db;

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

/*describe('Database testing', () => {
    it('connect to db', (done) => {
        MongoClient.connect(new Server(host, port), function(err, cl){
            expect(err).to.not.exist;
            client = cl;
            db = client.db(name);
            done();
        });
    });

    it('write user to database', (done) => {
        db.collection('users').insertOne({ 'name': 'omar aflak' }, function(err, result){
            expect(err).to.not.exist;
            done();
        });
    });
    
    it('read user from database', (done) => {
        db.collection('users').findOne({}, function(err, result){
            expect(err).to.not.exist;
            expect(result.name).to.equal('omar aflak');
            done();
        });
    });
    
    it('close db', () => {
        client.close();
    });
});*/
