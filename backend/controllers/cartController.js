// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * @desc    Get cart for user
 * @route   GET /api/cart
 * @access  Public
 */
exports.getCart = asyncHandler(async (req, res) => {
  const userId = req.headers['x-user-id'] || 'mock-user-123';
  
  const cart = await Cart.getOrCreateCart(userId);

  res.status(200).json({
    success: true,
    data: cart
  });
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Public
 */
exports.addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.headers['x-user-id'] || 'mock-user-123';

  // Validate input
  if (!productId) {
    return next(new AppError('Product ID is required', 400));
  }

  if (quantity < 1) {
    return next(new AppError('Quantity must be at least 1', 400));
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Check stock
  if (!product.checkStock(quantity)) {
    return next(new AppError('Insufficient stock', 400));
  }

  // Get or create cart
  const cart = await Cart.getOrCreateCart(userId);

  // Add item to cart
  await cart.addItem(productId, quantity, product.price);

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    data: cart
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:id
 * @access  Public
 */
exports.removeFromCart = asyncHandler(async (req, res, next) => {
  const { id: itemId } = req.params;
  const userId = req.headers['x-user-id'] || 'mock-user-123';

  const cart = await Cart.findOne({ userId, status: 'active' });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  await cart.removeItem(itemId);

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: cart
  });
});

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:id
 * @access  Public
 */
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { id: itemId } = req.params;
  const { quantity } = req.body;
  const userId = req.headers['x-user-id'] || 'mock-user-123';

  if (!quantity || quantity < 0) {
    return next(new AppError('Valid quantity is required', 400));
  }

  const cart = await Cart.findOne({ userId, status: 'active' })
    .populate('items.product');

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Find the item
  const item = cart.items.find(item => item._id.toString() === itemId);
  if (!item) {
    return next(new AppError('Item not found in cart', 404));
  }

  // Check stock
  if (!item.product.checkStock(quantity)) {
    return next(new AppError('Insufficient stock', 400));
  }

  await cart.updateItemQuantity(itemId, quantity);

  res.status(200).json({
    success: true,
    message: 'Cart updated',
    data: cart
  });
});

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Public
 */
exports.clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.headers['x-user-id'] || 'mock-user-123';

  const cart = await Cart.findOne({ userId, status: 'active' });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  await cart.clearCart();

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
    data: cart
  });
});