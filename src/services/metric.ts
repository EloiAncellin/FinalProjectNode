const Response = require('../api/models/response');
const Metric = require('../api/models/metric');
import MetricInterface from './interfaces/metric';
import MetricDataInterface from './interfaces/metricData';

export = {
    create: (metrics: MetricInterface[], callback: (response: Response) => void): void => {
        Metric.create(metrics).then((docs) => {
            callback(new Response(Response.SUCCESS, 201, docs));
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    },
    getById: (userId: string, metricId: string, callback: (response: Response) => void): void => {
        Metric.find({
            _id: metricId,
            userId: userId
        }).select(['-userId', '-__v']).then((metric) => {
            if (!metric.length) {
                callback(new Response(Response.ERROR, 404, 'Metric not found.'));
            } else {
                callback(new Response(Response.SUCCESS, 200, metric));
            }
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    },
    getByName: (userId: string, metricName: string, callback: (response: Response) => void): void => {
        Metric.find({
            userId: userId,
            name: metricName
        }).select(['-userId', '-__v']).then((docs) => {
            callback(new Response(Response.SUCCESS, 200, docs));
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    },
    getNames: (userId: string, callback: (response: Response) => void): void => {
        Metric.find({ userId: userId }).distinct('name').then((names) => {
            callback(new Response(Response.SUCCESS, 200, names));
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    },
    updateById: (userId: string, metricId: string, metricData: MetricDataInterface, callback: (response: Response) => void): void => {
        Metric.findOne({
            _id: metricId,
            userId: userId
        }).then((doc) => {
            if (!doc) {
                callback(new Response(Response.ERROR, 404, `Could not find metric with id=${metricId}`));
            } else {
                doc.name = metricData.name;
                doc.value = metricData.value;
                doc.save().then((doc) => {
                    callback(new Response(Response.SUCCESS, 200, doc));
                }).catch((err) => {
                    callback(new Response(Response.ERROR, 500, err));
                });
            }
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    },
    deleteById: (userId: string, metricId: string, callback: (response: Response) => void): void => {
        Metric.deleteOne({
            _id: metricId,
            userId: userId
        }).then((response) => {
            if (response.deletedCount == 1) {
                callback(new Response(Response.SUCCESS, 200, response));
            } else {
                callback(new Response(Response.ERROR, 404, 'Metric not found.'));
            }
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    }
};
