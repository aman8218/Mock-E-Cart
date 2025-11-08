// controllers/checkoutController.js
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * @desc    Process checkout
 * @route   POST /api/checkout
 * @access  Public
 */
exports.checkout = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.headers['x-user-id'] || 'mock-user-123';

  // Validate input
  if (!name || !email) {
    return next(new AppError('Name and email are required', 400));
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('Please provide a valid email', 400));
  }

  // Get active cart
  const cart = await Cart.findOne({ userId, status: 'active' })
    .populate('items.product');

  if (!cart || cart.items.length === 0) {
    return next(new AppError('Cart is empty', 400));
  }

  // Validate stock for all items
  for (const item of cart.items) {
    if (!item.product.checkStock(item.quantity)) {
      return next(
        new AppError(`Insufficient stock for ${item.product.name}`, 400)
      );
    }
  }

  // Create order
  const order = await Order.createFromCart(cart, { name, email });

  // Update product stock (optional - for production)
  for (const item of cart.items) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  // Mark cart as completed and clear it
  cart.status = 'completed';
  await cart.save();

  // Create new active cart for user
  await Cart.create({ userId, items: [] });

  // Generate receipt
  const receipt = {
    orderId: order.orderId,
    orderNumber: order.orderId,
    customer: {
      name: order.customerInfo.name,
      email: order.customerInfo.email
    },
    items: order.items.map(item => ({
      id: item._id,
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    })),
    summary: {
      subtotal: order.totalAmount,
      tax: (order.totalAmount * 0.1).toFixed(2), // 10% tax
      total: (order.totalAmount * 1.1).toFixed(2)
    },
    totalItems: order.totalItems,
    totalAmount: parseFloat((order.totalAmount * 1.1).toFixed(2)),
    timestamp: order.createdAt,
    status: order.status,
    paymentStatus: order.paymentStatus
  };

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: receipt
  });
});