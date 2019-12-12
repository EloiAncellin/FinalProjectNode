require('custom-env').env(process.env.APP_ENV);
import mongoUtils from '../utils/mongoUtils';
import sum from '../utils/sum';
const expect = require('chai').expect;
let _db;

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

describe('Database testing', () => {
    it('connect to database', (done) => {
        mongoUtils.connect(function(err, db) {
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
        mongoUtils.close();
    });
});
