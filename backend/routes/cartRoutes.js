// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cartController');

// @route   GET /api/cart
router.get('/', getCart);

// @route   POST /api/cart
router.post(
  '/',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  validate,
  addToCart
);

// @route   PUT /api/cart/:id
router.put(
  '/:id',
  [
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive number')
  ],
  validate,
  updateCartItem
);

// @route   DELETE /api/cart/:id
router.delete('/:id', removeFromCart);

// @route   DELETE /api/cart
router.delete('/', clearCart);

module.exports = router;