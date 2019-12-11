require('custom-env').env(process.env.APP_ENV);
var expect = require('chai').expect;
var utils = require('../utils/mongoUtils');
var sum = require('../utils/sum.js');
var _db;
describe('Some simple test', function () {
    it('should return sum', function () {
        expect(sum(1, 1)).to.equal(2);
    });
});
describe('Database testing', function () {
    it('connect to database', function (done) {
        utils.connectToDatabase(function (err, db) {
            _db = db;
            expect(err).to.not.exist;
            done();
        });
    });
    it('write user to database', function (done) {
        _db.collection('users').insertOne({ 'name': 'omar aflak' }, function (err, result) {
            expect(err).to.not.exist;
            done();
        });
    });
    it('read user from database', function (done) {
        _db.collection('users').findOne({}, function (err, result) {
            expect(err).to.not.exist;
            expect(result.name).to.equal('omar aflak');
            done();
        });
    });
    it('close database', function () {
        utils.closeDatabase();
    });
});
