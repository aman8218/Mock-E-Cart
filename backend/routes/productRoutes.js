const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  getProductsByCategory
} = require('../controllers/productController');

// @route   GET /api/products
router.get('/', getAllProducts);

// @route   GET /api/products/category/:category
router.get('/category/:category', getProductsByCategory);

// @route   GET /api/products/:id
router.get('/:id', getProduct);

module.exports = router;