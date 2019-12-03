require('custom-env').env(process.env.APP_ENV);
const mongoose = require('mongoose');
const expect = require('chai').expect;
const sum = require('../utils/sum.js');
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const url = `mongodb://${host}:${port}`;

// mock models
// const User = mongoose.model('User', { name: String });

describe('Some simple test', () => {
    it('should return sum', () => {
        expect(sum(1, 1)).to.equal(2);
    });
});

describe('Database testing', () => {
    before(() => {
        return mongoose.createConnection(url, {useNewUrlParser: true});
    });

    /*describe('Test Write / Read', () => {
        it('write user to database', () => {
            return new User({ name: 'Omar Aflak' }).save();
        });

        it('read user from database', () => {
           User.find({name: 'Omar Aflak'}, (err, result) => {
               expect(err).to.not.exist();
               expect(result.name).to.equal('Omar Aflak');
           }); 
        });
    });*/
});
