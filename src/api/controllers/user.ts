import Response from '../models/response';
const User = require('../models/user');

export = {
    create: function(req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }).then((response) => {
            const userWithoutHash = (({password, __v, ...x}) => x)(response._doc);
            res.status(200).json(new Response(Response.SUCCESS, userWithoutHash));
        }).catch((err) => {
            res.status(400).json(new Response(Response.ERROR, err));
        });
    }
}
