// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: true });

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      default: 'mock-user-123'
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster lookups
cartSchema.index({ userId: 1, status: 1 });

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  } else {
    this.totalItems = 0;
    this.totalPrice = 0;
  }
  next();
});

// Static method to get or create cart for user
cartSchema.statics.getOrCreateCart = async function(userId) {
  let cart = await this.findOne({ userId, status: 'active' })
    .populate('items.product');
  
  if (!cart) {
    cart = await this.create({ userId, items: [] });
  }
  
  return cart;
};

// Instance method to add item
cartSchema.methods.addItem = async function(productId, quantity, price) {
  // Check if item already exists
  const existingItem = this.items.find(
    item => item.product._id ? item.product._id.toString() === productId.toString() : item.product.toString() === productId.toString()
  );

  if (existingItem) {
    // Update existing item quantity
    existingItem.quantity += quantity;
  } else {
    // Add new item
    this.items.push({ product: productId, quantity, price });
  }

  await this.save();
  await this.populate('items.product');
  return this;
};

// Instance method to remove item
cartSchema.methods.removeItem = async function(itemId) {
  this.items = this.items.filter(item => item._id.toString() !== itemId.toString());
  await this.save();
  return this.populate('items.product');
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = async function(itemId, quantity) {
  const item = this.items.find(item => item._id.toString() === itemId.toString());
  
  if (!item) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    return this.removeItem(itemId);
  }

  item.quantity = quantity;
  await this.save();
  return this.populate('items.product');
};

// Instance method to clear cart
cartSchema.methods.clearCart = async function() {
  this.items = [];
  await this.save();
  return this;
};

module.exports = mongoose.model('Cart', cartSchema);