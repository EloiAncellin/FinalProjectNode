require('custom-env').env(process.env.APP_ENV);
const expect = require('chai').expect;
const request = require('supertest')
const mongoUtils = require('../utils/mongoUtils');
const User = require('../api/models/user');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

let server;

describe('Tests', () => {
    before((done) => {
        mongoUtils.connect().then(() => {
            mongoUtils.clear().then(() => {
                done();
            }).catch(done);
        }).catch(done);
    });

    after((done) => {
        mongoUtils.close();
        done();
    });

    describe('Database Tests', () => {
        it('write user to database', (done) => {
            User.create({
                email: 'toto01@ece.fr',
                password: 'password',
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
    });

    describe('Integration Tests', () => {
        before((done) => {
            if (process.env.WEB_PORT) {
                process.env.OLD_WEB_PORT = process.env.WEB_PORT;
                process.env.WEB_PORT = String(Number(process.env.WEB_PORT) + 1);
            }

            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());

            // routes
            app.use('/', require('../views/home'));
            app.use('/api', require('../api/api'));

            // start server
            server = app.listen(process.env.WEB_PORT, done);
        });

        after((done) => {
            server.close();
            process.env.WEB_PORT = process.env.OLD_WEB_PORT;
            done();
        });

        describe('POST /api/users/register', () => {
            it('responds with json user', () => {
                const user = {
                    email: 'toto02@ece.fr',
                    password: 'password',
                    firstName: 'toto02',
                    lastName: 'tata02'
                };
                request(app)
                    .post('/api/users/register')
                    .send(user)
                    .expect(200)
                    .then(response => {
                        expect(response.body.result.email).to.equal(user.email);
                        expect(response.body.result.firstName).to.equal(user.firstName);
                        expect(response.body.result.lastName).to.equal(user.lastName);
                    });
            });
        });

        describe('POST /api/users/authenticate', () => {
            it('responds with web token', () => {
                const cred = {
                    email: 'toto02@ece.fr',
                    password: 'password'
                };
                request(app)
                    .post('/api/users/authenticate')
                    .send(cred)
                    .expect(200)
                    .then(response => {
                        expect(response.body.result.token).to.exist;
                    });
            });
        });
    });
});

export = {};
