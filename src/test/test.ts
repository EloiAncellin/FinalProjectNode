require('custom-env').env(process.env.APP_ENV);
const chai = require('chai');
const request = require('supertest');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const mongoUtils = require('../utils/mongoUtils');
const expressUtils = require('../utils/expressUtils');
const User = require('../api/models/user');
const Response = require('../api/models/response');

const { expect } = chai;

chai.use(deepEqualInAnyOrder);
let _app;

describe('Tests', () => {
    before((done) => {
        mongoUtils.connect(true).then(() => {
            mongoUtils.clear().then(() => {
                process.env.VERBOSE = '0';
                process.env.OLD_WEB_PORT = process.env.WEB_PORT;
                process.env.WEB_PORT = String(Number(process.env.WEB_PORT) + 1);

                expressUtils.start().then((app) => {
                    _app = app;
                    done();
                }).catch(done);
            }).catch(done);
        }).catch(done);
    });

    after((done) => {
        mongoUtils.close();
        process.env.VERBOSE = '1';
        process.env.WEB_PORT = process.env.OLD_WEB_PORT;
        expressUtils.stop();
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
        let token;
        const user = {
            email: 'toto02@ece.fr',
            password: 'password',
            firstName: 'toto02',
            lastName: 'tata02'
        }

        before((done) => {
            request(_app)
                .post('/api/users/register')
                .send(user)
                .expect(200)
                .then(response => {
                    expect(response.body.status).to.equal(Response.SUCCESS);
                    expect(response.body.result._id).to.exist;
                    expect(response.body.result.email).to.equal(user.email);
                    expect(response.body.result.firstName).to.equal(user.firstName);
                    expect(response.body.result.lastName).to.equal(user.lastName);

                    request(_app)
                        .post('/api/users/authenticate')
                        .send({ email: user.email, password: user.password })
                        .expect(200)
                        .then(response => {
                            expect(response.body.status).to.equal(Response.SUCCESS);
                            expect(response.body.result.token).to.exist;
                            token = response.body.result.token;
                            done();
                        }).catch(done);
                }).catch(done);
        });

        describe('/api/users', () => {
            it('have access to personal resources', (done) => {
                request(_app)
                    .get('/api/users/me')
                    .set({ authorization: token })
                    .expect(200)
                    .then(response => {
                        expect(response.body.status).to.equal(Response.SUCCESS);
                        expect(response.body.result.email).to.equal(user.email);
                        expect(response.body.result.firstName).to.equal(user.firstName);
                        expect(response.body.result.lastName).to.equal(user.lastName);
                        expect(response.body.result.password).to.not.exist;
                        done();
                    }).catch(done);
            });
        });

        describe('/api/metrics', () => {
            const metricNames = ['metric1', 'metric2', 'metric3'];
            const metrics0 = [
                { name: metricNames[0], value: 25 },
                { name: metricNames[0], value: 42 },
                { name: metricNames[0], value: 21 }
            ];
            const metrics1 = [
                { name: metricNames[1], value: 15 },
                { name: metricNames[1], value: 65 },
                { name: metricNames[1], value: 47 }
            ];
            const metrics2 = [
                { name: metricNames[2], value: 96 },
                { name: metricNames[2], value: 36 },
                { name: metricNames[2], value: 88 }
            ];
            const metrics = metrics0.concat(metrics1, metrics2);
            let metricsObjects;

            it('create metrics', (done) => {
                request(_app)
                    .post('/api/metrics')
                    .set({ authorization: token })
                    .send({ metrics: metrics })
                    .expect(200)
                    .then(response => {
                        expect(response.body.status).to.equal(Response.SUCCESS);
                        metricsObjects = response.body.result;
                        const cleaned = response.body.result.map((metric) => (({_id, userId, date, __v, ...x}) => x)(metric));
                        expect(cleaned).to.deep.equalInAnyOrder(metrics);
                        done();
                    }).catch(done);
            });

            it('retrieve metric names', (done) => {
                request(_app)
                    .get('/api/metrics')
                    .set({ authorization: token })
                    .expect(200)
                    .then(response => {
                        expect(response.body.status).to.equal(Response.SUCCESS);
                        expect(response.body.result).to.deep.equalInAnyOrder(metricNames);
                        done();
                    }).catch(done);
            });

            it('retrieve metric values', (done) => {
                request(_app)
                    .get(`/api/metrics/collection/${metricNames[0]}`)
                    .set({ authorization: token })
                    .expect(200)
                    .then(response => {
                        expect(response.body.status).to.equal(Response.SUCCESS);
                        const cleaned = response.body.result.map((metric) => (({_id, userId, date, __v, ...x}) => x)(metric));
                        expect(cleaned).to.deep.equalInAnyOrder(metrics0);
                        done();
                    }).catch(done);
            })

            it('update metric', (done) => {
                request(_app)
                    .put(`/api/metrics/${metricsObjects[0]._id}`)
                    .set({ authorization: token })
                    .send({ name: metricsObjects[0].name, value: 0})
                    .expect(200)
                    .then(response => {
                        expect(response.body.status).to.equal(Response.SUCCESS);
                        expect(response.body.result.value).to.equal(0);
                        metricsObjects[0].value = 0;
                        done();
                    }).catch(done);
            });

            it('delete metric', (done) => {
                request(_app)
                    .delete(`/api/metrics/${metricsObjects[0]._id}`)
                    .set({ authorization: token })
                    .expect(200)
                    .then(response => {
                        expect(response.body.status).to.equal(Response.SUCCESS);
                        request(_app)
                            .get(`/api/metrics/${metricsObjects[0]._id}`)
                            .set({ authorization: token })
                            .expect(401)
                            .then(response => {
                                expect(response.body.status).to.equal(Response.ERROR);
                                done();
                            }).catch(done);
                    }).catch(done);
            });
        })
    });
});

export = {};
