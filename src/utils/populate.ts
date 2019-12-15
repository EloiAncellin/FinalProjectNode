require('custom-env').env(process.env.APP_ENV);
const colors = require('colors/safe');
const _ = require('underscore');
const mongoUtils = require('./mongoUtils');
const User = require('../api/models/user');
const Metric = require('../api/models/metric');

mongoUtils.connect().then(() => {
    const profiles = [
        {
            user: {
                email: 'toto01@ece.fr',
                password: 'toto01',
                firstName: 'Toto 01',
                lastName: 'Tata 01'
            },
            metrics: [
                { name: 'metric01', value: 54, date: new Date() },
                { name: 'metric01', value: 21, date: new Date() },
                { name: 'metric01', value: 14, date: new Date() },
                { name: 'metric01', value: 96, date: new Date() },
                { name: 'metric02', value: 47, date: new Date() },
                { name: 'metric02', value: 60, date: new Date() },
                { name: 'metric02', value: 50, date: new Date() },
                { name: 'metric02', value: 75, date: new Date() }
            ]
        },
        {
            user: {
                email: 'toto02@ece.fr',
                password: 'toto02',
                firstName: 'Toto 02',
                lastName: 'Tata 02'
            },
            metrics: [
                { name: 'metric01', value: 14, date: new Date() },
                { name: 'metric01', value: 62, date: new Date() },
                { name: 'metric01', value: 83, date: new Date() },
                { name: 'metric01', value: 49, date: new Date() },
                { name: 'metric02', value: 10, date: new Date() },
                { name: 'metric02', value: 20, date: new Date() },
                { name: 'metric02', value: 15, date: new Date() },
                { name: 'metric02', value: 36, date: new Date() }
            ]
        }
    ];

    const finished = _.after(profiles.length, () => {
        mongoUtils.close();
    });

    profiles.forEach((profile, index) => {
        console.log(colors.brightYellow.bold(`Creating profile ${index + 1}...`));
        User.create(profile.user).then((response) => {
            const metrics = profile.metrics.map((metric) => {
                return { userId: response._id, ...metric};
            });
            Metric.create(metrics).then((response) => {
                console.log(colors.brightGreen.bold(`Profile ${index + 1} created ✔️`));
                finished();
            }).catch((err) => {
                console.log(colors.brightRed.bold(err.errmsg));
                finished();
            })
        }).catch((err) => {
            console.log(colors.brightRed.bold(err.errmsg));
            finished();
        });
    });
}).catch((err) => {
    throw err;
});
