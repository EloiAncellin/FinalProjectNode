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
        mongoUtils.connect().then((db) => {
            _db = db;
            expect(db).to.not.null;
            done();
        }).catch(done);
    });

    it('clear database', (done) => {
        mongoUtils.clear().then((result) => {
            expect(result).to.not.null;
            done();
        }).catch(done);
    });

    it('initialize database', (done) => {
        mongoUtils.init().then((result) => {
            expect(result).to.not.null;
            done();
        }).catch(done);
    });

    it('write user to database', (done) => {
        _db.collection('users').insertOne({ email: 'toto1@ece.fr' }).then((result) => {
            expect(result).to.not.null;
            done();
        }).catch(done);
    });

    it('read user from database', (done) => {
        _db.collection('users').findOne({ email: 'toto1@ece.fr' }).then((result) => {
            expect(result).to.not.null;
            done();
        }).catch(done);
    });

    it('read non existant user from database', (done) => {
        _db.collection('users').findOne({ email: 'xxx' }).then((result) => {
            expect(result).to.null;
            done();
        }).catch(done);
    });

    it('close database', () => {
        mongoUtils.close();
    });
});
