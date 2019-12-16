require('dotenv').config();
const colors = require('colors/safe');
const _ = require('underscore');
const mongoUtils = require('../dist/utils/mongoUtils');
const User = require('../dist/api/models/user');
const Metric = require('../dist/api/models/metric');

const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomNumber = (start: number, end: number) => {
    return start + Math.random() * (end - start);
}

mongoUtils.connect().then(() => {
    const profiles: any[] = [
        {
            user: {
                email: 'toto01@ece.fr',
                password: 'toto01',
                firstName: 'Toto 01',
                lastName: 'Tata 01'
            },
            metrics: []
        },
        {
            user: {
                email: 'toto02@ece.fr',
                password: 'toto02',
                firstName: 'Toto 02',
                lastName: 'Tata 02'
            },
            metrics: []
        }
    ];

    profiles.forEach((profile, index) => {
        const names = ['metric1', 'metric2', 'metric3'];
        const metrics: any[] = [];
        names.forEach((name) => {
            for (let i=0 ; i<100 ; i++) {
                metrics.push({
                    name: name,
                    value: randomNumber(0, 50),
                    date: randomDate(new Date(2010, 1, 1), new Date())
                });
            }
        });
        profiles[index].metrics = metrics;
    });

    const finished = _.after(profiles.length, () => {
        profiles.forEach((profile) => {
            const text = `email[${profile.user.email}], password[${profile.user.password}]`;
            console.log(colors.bold.brightMagenta(text));
        });
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

export = {};
