const expect = require('chai').expect;
const utils = require('../utils/mongoUtils');
const sum = require('../utils/sum.js');

var _db;

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

describe('Database testing', () => {
    it('connect to database', (done) => {
        utils.connectToDatabase(function(err, db) {
            _db = db;
            expect(err).to.not.exist;
            done();
        });
    });

    it('write user to database', (done) => {
        _db.collection('users').insertOne({ 'name': 'omar aflak' }, function(err, result) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('read user from database', (done) => {
        _db.collection('users').findOne({}, function(err, result) {
            expect(err).to.not.exist;
            expect(result.name).to.equal('omar aflak');
            done();
        });
    });

    it('close database', () => {
        utils.closeDatabase();
    });
});
