const Product = require('./product.model');

const createProduct = (data) => Product.create(data);
const findProductById = (id) => Product.findById(id);
const updateProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });
const deleteProduct = (id) => Product.findByIdAndRemove(id);

module.exports = {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct
}
