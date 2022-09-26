const { Router } = require('express');
const router = Router();

const {
    createProductHandler, findProductByIdHandler, updateProductHandler, deleteProductHandler, findAllProductsHandler
} = require('./product.controller');

const { isAuthenticated } = require('../../auth/local/auth.controller');

router.post('/create', isAuthenticated, createProductHandler);
router.get('/:id', findProductByIdHandler);
router.get('/', findAllProductsHandler);
router.patch('/:id', isAuthenticated, updateProductHandler);
router.delete('/:id', isAuthenticated, deleteProductHandler);

module.exports = router;
