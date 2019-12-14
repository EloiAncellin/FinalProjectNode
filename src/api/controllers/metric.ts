const Response = require('../models/response');
const Metric = require('../models/metric');

export = {
    create: function(req, res) {
        Metric.create({
            userId: req.body.user._id,
            name: req.body.name,
            value: req.body.value,
            date: new Date()
        }).then((doc) => {
            res.status(200).json(new Response(Response.SUCCESS, doc));
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        });
    },
    getByName: function(req, res) {
        Metric.find({
            userId: req.body.user._id,
            name: req.params.name
        }).select(['-userId', '-__v']).then((docs) => {
            res.status(200).json(new Response(Response.SUCCESS, docs));
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        })
    },
    getNames: function(req, res) {
        Metric.find({ userId: req.body.user._id }).distinct('name').then((names) => {
            res.status(200).json(new Response(Response.SUCCESS, names));
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        });
    },
    updateById: function(req, res) {
        Metric.findOne({
            _id: req.params.id,
            userId: req.body.user._id
        }).then((doc) => {
            if (!doc) {
                res.status(400).json(new Response(Response.ERROR, `Could not find metric with id=${req.body.id}`));
            } else {
                doc.name = req.body.name;
                doc.value = req.body.value;
                doc.save().then((doc) => {
                    res.status(200).json(new Response(Response.SUCCESS, doc));
                }).catch((err) => {
                    res.status(400).json(new Response(Response.ERROR, err));
                });
            }
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        })
    },
    deleteById: function(req, res) {
        Metric.deleteOne({
            _id: req.params.id,
            userId: req.body.user._id
        }).then((response) => {
            res.status(200).json(new Response(Response.SUCCESS, response));
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        });
    }
}
