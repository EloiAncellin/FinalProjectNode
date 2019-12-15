const Response = require('../models/response');
const userService = require('../../services/user');

export = {
    create: (req, res) => {
        userService.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }).then((response) => {
            res.status(response.code).json(response);
        }).catch((err) => {
            res.status(err.code).json(err);
        })
    },
    authenticate: (req, res) => {
        userService.authenticate({
            email: req.body.email,
            password: req.body.password
        }).then((response) => {
            res.status(response.code).json(response);
        }).catch((err) => {
            res.status(err.code).json(err);
        });
    },
    getPersonalDetails: (req, res) => {
        const userWithoutHash = (({password, __v, ...x}) => x)(req.body.user._doc);
        const response = new Response(Response.SUCCESS, 200, userWithoutHash);
        res.status(response.code).json(response);
    }
};
