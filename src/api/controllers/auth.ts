const jwt = require('jsonwebtoken');
const keys = require('../../keys/generate');
const User = require('../models/user');
const Response = require('../models/response');

export = {
    ensureAuthenticated: function(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json(new Response(Response.ERROR, 'Token is missing.'));
        }

        const verifyOptions = {
            expiresIn: process.env.JWT_VALIDITY,
            algorithm: [process.env.JWT_ALGORITHM]
        }

        jwt.verify(token, keys.publicKey, verifyOptions, function(err, payload) {
            if (err) {
                res.status(401).json(new Response(Response.ERROR, err));
            } else {
                User.findById(payload.userId, function(err, user) {
                    if (!user) {
                        return res.status(401).json(new Response(Response.ERROR, 'User not found.'));
                    } else {
                        req.body.user = user;
                        next();
                    }
                });
            }
        });
    }
}
