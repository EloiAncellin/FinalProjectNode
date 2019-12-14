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
        }).then((docs) => {
            res.status(200).json(new Response(Response.SUCCESS, docs));
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        })
    }
}
