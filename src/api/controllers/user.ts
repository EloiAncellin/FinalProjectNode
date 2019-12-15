const jwt = require('jsonwebtoken');
const keys = require('../../keys/generate');
const Response = require('../models/response');
const User = require('../models/user');

export = {
    create: (req, res) => {
        User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }).then((response) => {
            const userWithoutHash = (({password, __v, ...x}) => x)(response._doc);
            res.status(201).json(new Response(Response.SUCCESS, userWithoutHash));
        }).catch((err) => {
            res.status(500).json(new Response(Response.ERROR, err));
        });
    },
    authenticate: (req, res) => {
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                res.status(200).json(new Response(Response.ERROR, 'Could not find user.'));
            } else {
                user.comparePassword(req.body.password).then(() => {
                    const signOptions = {
                        expiresIn: process.env.JWT_VALIDITY,
                        algorithm: process.env.JWT_ALGORITHM
                    }
                    const token = jwt.sign({ userId: user._id }, keys.privateKey, signOptions);
                    res.status(200).json(new Response(Response.SUCCESS, { token: token }));
                }).catch((err) => {
                    res.status(401).json(new Response(Response.ERROR, 'Wrong password.'));
                });
            }
        }).catch((err) => {
            res.status(401).json(new Response(Response.ERROR, err));
        });
    },
    getPersonalDetails: (req, res) => {
        const userWithoutHash = (({password, __v, ...x}) => x)(req.body.user._doc);
        res.status(200).json(new Response(Response.SUCCESS, userWithoutHash));
    }
};
