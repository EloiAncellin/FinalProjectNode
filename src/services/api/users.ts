import Response from '../../models/response';
import User from '../../models/user';
const db = require('../../utils/mongoUtils').db();
const hash = require('password-hash');

export = {
    getUserByEmail: function(email: string): Promise<Response<User>> {
        return new Promise((resolve, reject) => {
            db.collection('users').findOne({ email: email }).then((result) => {
                if (result) {
                    const user = new User(result._id, result.email, null, result.firstName, result.lastName);
                    resolve(new Response(Response.SUCCESS, user));
                } else {
                    reject(new Response(Response.ERROR, `Could not find user with email ${email}.`));
                }
            }).catch((err) => {
                reject(new Response(Response.ERROR, err));
            });
        });
    },
    createUser: function(user: User): Promise<Response<User>> {
        return new Promise((resolve, reject) => {
            const obj = {
                email: user.email,
                password: hash.generate(user.password),
                firstName: user.firstName,
                lastName: user.lastName
            };
            db.collection('users').insertOne(obj).then((result) => {
                user.id = result.insertedId;
                user.password = null;
                resolve(new Response(Response.SUCCESS, user));
            }).catch((err) => {
                reject(new Response(Response.ERROR, err));
            });
        });
    }
}
