const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    }
});

userSchema.pre('save', function(this: any, next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password).then((match) => {
            if (match) {
                resolve(true);
            } else {
                reject(false);
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

const User = mongoose.model('User', userSchema);
export = User;
