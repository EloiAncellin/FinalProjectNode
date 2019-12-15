const jwt = require('jsonwebtoken');
const keys = require('../keys/generate');
const User = require('../api/models/user');
const Response = require('../api/models/response');

export = {
    ensureAuthenticated: (token: string, callback: (response: Response) => void): void => {
        const verifyOptions = {
            expiresIn: process.env.JWT_VALIDITY,
            algorithm: [process.env.JWT_ALGORITHM]
        }

        jwt.verify(token, keys.publicKey, verifyOptions, (err, payload) => {
            if (err) {
                callback(new Response(Response.ERROR, 401, err));
            } else {
                User.findById(payload.userId, (err, user) => {
                    if (!user) {
                        callback(new Response(Response.ERROR, 404, 'User not found.'));
                    } else {
                        callback(new Response(Response.SUCCESS, 200, user));
                    }
                });
            }
        });
    }
};
