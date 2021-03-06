const Response = require('../models/response');
const Metric = require('../models/metric');

export = {
    create: (req, res) => {
        if (req.body.metrics && Array.isArray(req.body.metrics)) {
            const metrics = req.body.metrics.map((metric) => {
                return {
                    userId: req.body.user._id,
                    name: metric.name,
                    value: metric.value,
                    date: new Date()
                };
            });
            Metric.create(metrics).then((docs) => {
                res.status(201).json(new Response(Response.SUCCESS, docs));
            }).catch((err) => {
                res.status(500).json(new Response(Response.ERROR, err.message));
            });
        } else {
            res.status(422).json(new Response(Response.ERROR, 'Missing parameter `metrics`.'));
        }
    },
    getById: (req, res) => {
        Metric.find({
            _id: req.params.id,
            userId: req.body.user._id
        }).select(['-userId', '-__v']).then((metric) => {
            if (!metric.length) {
                res.status(404).json(new Response(Response.ERROR, 'Metric not found.'));
            } else {
                res.status(200).json(new Response(Response.SUCCESS, metric));
            }
        }).catch((err) => {
            res.status(500).json(new Response(Response.ERROR, err.message));
        });
    },
    getByName: (req, res) => {
        Metric.find({
            userId: req.body.user._id,
            name: req.params.name
        }).sort('-date').select(['-userId', '-__v']).then((docs) => {
            res.status(200).json(new Response(Response.SUCCESS, docs));
        }).catch((err) => {
            res.status(500).json(new Response(Response.ERROR, err.message));
        });
    },
    getNames: (req, res) => {
        Metric.find({ userId: req.body.user._id }).distinct('name').then((names) => {
            res.status(200).json(new Response(Response.SUCCESS, names));
        }).catch((err) => {
            res.status(500).json(new Response(Response.ERROR, err.message));
        });
    },
    updateById: (req, res) => {
        Metric.findOne({
            _id: req.params.id,
            userId: req.body.user._id
        }).then((doc) => {
            if (!doc) {
                res.status(404).json(new Response(Response.ERROR, `Could not find metric with id=${req.params.id}`));
            } else {
                doc.name = req.body.name;
                doc.value = req.body.value;
                doc.save().then((doc) => {
                    res.status(200).json(new Response(Response.SUCCESS, doc));
                }).catch((err) => {
                    res.status(500).json(new Response(Response.ERROR, err.message));
                });
            }
        }).catch((err) => {
            res.status(500).json(new Response(Response.ERROR, err.message));
        });
    },
    deleteById: (req, res) => {
        Metric.deleteOne({
            _id: req.params.id,
            userId: req.body.user._id
        }).then((response) => {
            if (response.deletedCount == 1) {
                res.status(200).json(new Response(Response.SUCCESS, response));
            } else {
                res.status(404).json(new Response(Response.ERROR, 'Metric not found.'));
            }
        }).catch((err) => {
            res.status(500).json(new Response(Response.ERROR, err.message));
        });
    }
};
