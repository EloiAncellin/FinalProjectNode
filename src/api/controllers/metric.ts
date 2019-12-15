const Response = require('../models/response');
const metricService = require('../../services/metric');

export = {
    create: (req, res) => {
        if (req.body.metrics && Array.isArray(req.body.metrics)) {
            metricService.create(req.body.metrics.map((metric) => {
                return {
                    userId: req.body.user._id,
                    name: metric.name,
                    value: metric.value,
                    date: new Date()
                };
            }), (response) => {
                res.status(response.code).json(response);
            });
        } else {
            const response = new Response(Response.ERROR, 422, 'Missing parameter `metrics`.');
            res.status(response.code).json(response);
        }
    },
    getById: (req, res) => {
        metricService.getById(req.body.user._id, req.params.id, (response) => {
            res.status(response.code).json(response);
        })
    },
    getByName: (req, res) => {
        metricService.getByName(req.body.user._id, req.params.name, (response) => {
            res.status(response.code).json(response);
        });
    },
    getNames: (req, res) => {
        metricService.getNames(req.body.user._id, (response) => {
            res.status(response.code).json(response);
        });
    },
    updateById: (req, res) => {
        metricService.updateById(req.body.user._id, req.params.id, {
            name: req.body.name,
            value: req.body.value
        }, (response) => {
            res.status(response.code).json(response);
        });
    },
    deleteById: (req, res) => {
        metricService.deleteById(req.body.user._id, req.params.id, (response) => {
            res.status(response.code).json(response);
        });
    }
};
