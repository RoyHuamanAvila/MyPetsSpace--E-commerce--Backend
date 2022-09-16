const { Schema, default: mongoose } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user'
    },
    listProducts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
