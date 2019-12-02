var expect = require('chai').expect;
var sum = require('../utils/sum.js');
var MongoClient = require('mongodb').MongoClient;

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

describe('Database testing', () => {
    it('should write and read successfully', () => {
        MongoClient.connect('mongodb://mongodb:27017/', function(err, db) {
            expect(err).to.not.exist;
            var dbo = db.db("test");
            
            // write
            var object = { 'name': 'omar aflak' };
            dbo.collection('users').insertOne(object, function(err, result){
                expect(err).to.not.exist;

                // read
                dbo.collection('users').findOne({}, function(err, result){
                    expect(err).to.not.exist;
                    expect(result).to.equal(object);
                });
            });
        });
    });
});
