const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getProductsUnderPrice,
    getLowStockProducts,
    getTotalInventoryValue
} = require('../controllers/productController');

router.get('/search', searchProducts);
router.get('/low-stock', getLowStockProducts);
router.get('/value', getTotalInventoryValue);
router.get('/category/:category', getProductsByCategory);
router.get('/price/:price', getProductsUnderPrice);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
