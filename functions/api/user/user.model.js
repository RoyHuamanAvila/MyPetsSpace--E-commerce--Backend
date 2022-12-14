const { Schema, default: mongoose } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    direction: {
        type: String,
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
    posts: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    imagePerfil: {
        type: String,
        default: 'https://res.cloudinary.com/dk53juigy/image/upload/v1664242797/MyPetsSpace/Utils/PerfilDefault.png'
    },
    listProducts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }]
}, { timestamps: true });

UserSchema.virtual('profile').get(function profile() {
    const {
        _id, name, email, imagePerfil, posts, followers, sales, direction
    } = this;

    return {
        _id,
        name,
        direction,
        email,
        posts,
        followers,
        sales,
        imagePerfil,
    };
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
