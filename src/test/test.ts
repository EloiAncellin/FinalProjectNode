require('custom-env').env(process.env.APP_ENV);
import mongoUtils from '../utils/mongoUtils';
import User from '../api/models/user';
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Database testing', () => {
    it('connect to database', (done) => {
        mongoUtils.connect().then(() => {
            done();
        }).catch(done);
    });

    it('clear database', (done) => {
        mongoUtils.clear().then(() => {
            done();
        }).catch(done);
    });

    it('write user to database', (done) => {
        User.create({
            email: 'toto01@ece.fr',
            password: 'toto01',
            firstName: 'toto01',
            lastName: 'tata01'
        }).then((response) => {
            done();
        }).catch(done);
    });

    it('read user from database', (done) => {
        User.findOne({ email: 'toto01@ece.fr' }).then((response) => {
            expect(response).to.exist;
            done();
        }).catch(done);
    });

    it('read non existant user from database', (done) => {
        User.findOne({ email: 'X' }).then((response) => {
            expect(response).to.not.exist;
            done();
        }).catch(done);
    });

    it('close database', () => {
        mongoUtils.close();
    });
});
