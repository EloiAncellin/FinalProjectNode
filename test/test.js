require('dotenv').config();
const expect = require('chai').expect;
const sum = require('../utils/sum.js');
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const host = process.env.DB_HOST_TEST;
const port = process.env.DB_PORT_TEST;
const name = process.env.DB_NAME_TEST;

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

describe('Database testing', () => {
    it('should write and read successfully', () => {
        MongoClient.connect(new Server(host, port), function(err, client) {
            expect(err).to.not.exist;
            var db = client.db(name);
            
            // write
            var object = { 'name': 'omar aflak' };
            db.collection('users').insertOne(object, function(err, result){
                expect(err).to.not.exist;

                // read
                db.collection('users').findOne({}, function(err, result){
                    expect(err).to.not.exist;
                    expect(result).to.equal(object);
                });
            });
        });
    });
});
