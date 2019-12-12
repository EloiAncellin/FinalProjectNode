import User from '../../interfaces/user';
const db = require('../../utils/mongoUtils').getDb();

export = {
    getUserByEmail: function(email: string, callback: (error: string | undefined, result?: User) => void) {
        db.collection('users').findOne({ email: email }, function(err, result) {
            if (err) {
                callback(`Could not find user with email ${email}.`);
            } else {
                let user = new User(result._id, result.email, null, result.firstName, result.lastName);
                callback(undefined, user);
            }
        });
    }
    // createUser: function(email: string, password: string, callback: (error: string, result: User) => void) {
    //     db.collection('users').insertOne({ 'name': 'omar aflak' }, function(err, result) {
    //         if (err) res.send('oups...')
    //     });
    // }
}
