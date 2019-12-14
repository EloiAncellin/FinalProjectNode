require('custom-env').env(process.env.APP_ENV);
const expect = require('chai').expect;
const request = require('supertest')
const mongoUtils = require('../utils/mongoUtils');
const expressUtils = require('../utils/expressUtils');
const User = require('../api/models/user');
const Response = require('../api/models/response');

let _app;

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
            process.env.VERBOSE = '0';
            process.env.OLD_WEB_PORT = process.env.WEB_PORT;
            process.env.WEB_PORT = String(Number(process.env.WEB_PORT) + 1);

            expressUtils.start().then((app) => {
                _app = app;
                done();
            }).catch(done);
        });

        after((done) => {
            process.env.VERBOSE = '1';
            process.env.WEB_PORT = process.env.OLD_WEB_PORT;
            expressUtils.stop();
            done();
        });

        describe('POST /api/users/register', () => {
            it('responds with json user', (done) => {
                const user = {
                    email: 'toto02@ece.fr',
                    password: 'password',
                    firstName: 'toto02',
                    lastName: 'tata02'
                };
                request(_app)
                    .post('/api/users/register')
                    .send(user)
                    .expect(200)
                    .then(response => {
                        expect(response.body.result.email).to.equal(user.email);
                        expect(response.body.result.firstName).to.equal(user.firstName);
                        expect(response.body.result.lastName).to.equal(user.lastName);
                        done();
                    }).catch(done);
            });
        });

        describe('POST /api/users/authenticate', () => {
            it('responds with web token', (done) => {
                const cred = {
                    email: 'toto02@ece.fr',
                    password: 'password'
                };
                request(_app)
                    .post('/api/users/authenticate')
                    .send(cred)
                    .expect(200)
                    .then(response => {
                        expect(response.body.result.token).to.exist;
                        done();
                    }).catch(done);
            });

            it('allows access to personal resources', (done) => {
                const cred = {
                    email: 'toto02@ece.fr',
                    password: 'password'
                };
                request(_app)
                    .post('/api/users/authenticate')
                    .send(cred)
                    .expect(200)
                    .then(response => {
                        const token = response.body.result.token;
                        expect(token).to.exist;
                        request(_app)
                            .get('/api/users/me')
                            .set({ authorization: token })
                            .expect(200)
                            .then(response => {
                                expect(response.body.status).to.equal(Response.SUCCESS);
                                expect(response.body.result.email).to.equal(cred.email);
                                done();
                            }).catch(done);
                    }).catch(done);
            });
        });
    });
});

export = {};
