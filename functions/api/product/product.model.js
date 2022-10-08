const { Schema, default: mongoose } = require('mongoose');

const ProductSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['food', 'toy', 'clothing', 'bed'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
