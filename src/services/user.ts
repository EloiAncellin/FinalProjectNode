const jwt = require('jsonwebtoken');
const keys = require('../keys/generate');
const Response = require('../api/models/response');
const User = require('../api/models/user');
import UserInterface from './interfaces/user';
import CredentialInterface from './interfaces/credential';

export = {
    create: (user: UserInterface, callback: (response: Response) => void): void => {
        User.create(user).then((response) => {
            const userWithoutHash = (({password, __v, ...x}) => x)(response._doc);
            callback(new Response(Response.SUCCESS, 201, userWithoutHash));
        }).catch((err) => {
            callback(new Response(Response.ERROR, 500, err));
        });
    },
    authenticate: (cred: CredentialInterface, callback: (response: Response) => void): void => {
        User.findOne({ email: cred.email }).then((user) => {
            if (!user) {
                callback(new Response(Response.ERROR, 200, 'Could not find user.'));
            } else {
                user.comparePassword(cred.password).then(() => {
                    const signOptions = {
                        expiresIn: process.env.JWT_VALIDITY,
                        algorithm: process.env.JWT_ALGORITHM
                    }
                    const token = jwt.sign({ userId: user._id }, keys.privateKey, signOptions);
                    callback(new Response(Response.SUCCESS, 200, { token: token }));
                }).catch((err) => {
                    callback(new Response(Response.ERROR, 401, 'Wrong password.'));
                });
            }
        }).catch((err) => {
            callback(new Response(Response.ERROR, 401, err));
        });
    }
};
