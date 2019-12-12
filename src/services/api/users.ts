import User from '../../models/user';
const db = require('../../utils/mongoUtils').getDb();

export = {
    getUserByEmail: function(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            db.collection('users').findOne({ email: email }, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result) {
                        resolve(new User(result._id, result.email, null, result.firstName, result.lastName));
                    } else {
                        reject(`Could not find user with email ${email}.`);
                    }
                }
            });
        });
    },
    createUser: function(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const obj = {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            };
            db.collection('users').insertOne(obj, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    user.id = result.insertedId;
                    resolve(user);
                }
            });
        });
    }
}
