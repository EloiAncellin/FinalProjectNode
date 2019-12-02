require('dotenv').config();
const expect = require('chai').expect;
const sum = require('../utils/sum.js');
const MongoClient = require('mongodb').MongoClient;
const host = process.env.DB_HOST_TEST;
const port = process.env.DB_PORT_TEST;
const user = process.env.DB_USER_TEST;
const pass = process.env.DB_PASS_TEST;
const name = process.env.DB_NAME_TEST;
const url = `mongodb://${user}:${pass}@${host}:${port}/${name}`;

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

/*
describe('Database testing', () => {
    it('should write and read successfully', () => {
        MongoClient.connect(url, function(err, db) {
            expect(err).to.not.exist;
            var dbo = db.db(process.env.DB_TEST_NAME);
            
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
*/
