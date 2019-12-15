const Response = require('../models/response');
const userService = require('../../services/user');

export = {
    create: (req, res) => {
        userService.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, (response) => {
            res.status(response.code).json(response);
        });
    },
    authenticate: (req, res) => {
        userService.authenticate({
            email: req.body.email,
            password: req.body.password
        }, (response) => {
            res.status(response.code).json(response);
        });
    },
    getPersonalDetails: (req, res) => {
        const userWithoutHash = (({password, __v, ...x}) => x)(req.body.user._doc);
        const response = new Response(Response.SUCCESS, 200, userWithoutHash);
        res.status(response.code).json(response);
    }
};
