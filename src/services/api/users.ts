import User from '../../interfaces/user';
const db = require('../../utils/mongoUtils').getDb();

export = {
    getUserByEmail: function(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            db.collection('users').findOne({ email: email }, function(err, result) {
                if (err) {
                    reject('Unexpected error...');
                } else {
                    if (result) {
                        resolve(new User(result._id, result.email, null, result.firstName, result.lastName));
                    } else {
                        reject(`Could not find user with email ${email}.`);
                    }
                }
            });
        });
    }
    // createUser: function(email: string, password: string, callback: (error: string, result: User) => void) {
    //     db.collection('users').insertOne({ 'name': 'omar aflak' }, function(err, result) {
    //         if (err) res.send('oups...')
    //     });
    // }
}
