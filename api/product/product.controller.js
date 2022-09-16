const {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct
} = require('./product.service');

const {
    findUserById,
    updateUserById
} = require('../user/user.service')

const createProductHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ message: 'require user' });

        const userFound = await findUserById(user._id);
        if (!userFound) return res.status(404).json({ message: 'user not found' });

        const productData = req.body;
        const newProduct = await createProduct({ ...productData, user: userFound._id });

        const userUpdated = await updateUserById(userFound._id, {
            $push: { listProducts: newProduct._id }
        })

        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json(error);
    }



}

const findProductByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const productFound = await findProductById(id);
        if (!productFound) return res.status(404).json({ message: 'product not found' });

        return res.status(200).json(productFound)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateProductHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const user = req.user;
        if (!user) return res.status(403).json({ message: 'require user' })
        const newData = req.body;

        const productFound = await findProductById(id);
        if (!productFound) return res.status(404).json({ message: 'product not found' });

        const userProduct = productFound.user.toString();
        const userID = user._id.toString();
        if (userProduct !== userID) return res.status(403).json({ message: 'This product is not from this user.' });

        const productUpdated = await updateProduct(id, newData);
        return res.status(200).json(productUpdated);

    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteProductHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const user = req.user;
        if (!user) return res.status(403).json({ message: 'require user' });

        const productFound = await findProductById(id);
        if (!productFound) return res.status(404).json({ message: 'product not found' });

        const userProduct = productFound.user.toString();
        const userID = user._id.toString();
        if (userProduct !== userID) return res.status(403).json({ message: 'This product is not from this user.' });

        const productDeleted = await deleteProduct(id);
        const userUpdated = await updateUserById(user._id, {
            $pull: {
                listProducts: productDeleted._id
            }
        })
        return res.status(200).json({ message: 'product deleted', productDeleted });
    } catch (error) {

    }
}

module.exports = {
    createProductHandler,
    findProductByIdHandler,
    updateProductHandler,
    deleteProductHandler
}
