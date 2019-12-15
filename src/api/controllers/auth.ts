const Response = require('../models/response');
const authService = require('../../services/auth');

export = {
    ensureAuthenticated: (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            const response = new Response(Response.ERROR, 422, 'Token is missing.');
            res.status(response.code).json(response);
        } else {
            authService.ensureAuthenticated(token, (response) => {
                if (response.status === Response.SUCCESS) {
                    req.body.user = response.result;
                    next();
                } else {
                    res.status(response.code).json(response);
                }
            });
        }
    }
};
