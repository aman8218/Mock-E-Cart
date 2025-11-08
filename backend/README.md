# Vibe Commerce - Backend API

Production-ready REST API for e-commerce shopping cart built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add, update, remove items with real-time calculations
- **Checkout System**: Process orders with customer information
- **Database Persistence**: MongoDB for data storage
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet for HTTP headers, CORS enabled
- **Logging**: Morgan for request logging

## 📁 Project Structure

```
backend/
├── controllers/          # Route controllers
│   ├── productController.js
│   ├── cartController.js
│   └── checkoutController.js
├── models/              # Mongoose models
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/              # API routes
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── checkoutRoutes.js
├── middleware/          # Custom middleware
│   ├── errorHandler.js
│   └── validate.js
├── utils/              # Utility functions
│   ├── asyncHandler.js
│   └── AppError.js
├── scripts/            # Database scripts
│   └── seedProducts.js
├── .env.example        # Environment variables template
├── server.js           # Application entry point
└── package.json        # Dependencies
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
DEFAULT_USER_ID=mock-user-123
CORS_ORIGIN=http://localhost:3000
```

4. **Seed the database**
```bash
npm run seed
```

5. **Start the server**
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort by: `price-asc`, `price-desc`, `name`, `rating`
- `search` - Text search in name/description

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Wireless Bluetooth Headphones",
      "description": "Premium noise-cancelling headphones...",
      "price": 199.99,
      "image": "https://...",
      "category": "Electronics",
      "stock": 50,
      "rating": 4.8,
      "createdAt": "2024-11-08T..."
    }
  ]
}
```

#### Get Single Product
```http
GET /api/products/:id
```

### Cart

#### Get Cart
```http
GET /api/cart
```

**Headers:**
- `x-user-id` (optional) - User identifier (defaults to mock-user-123)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "userId": "mock-user-123",
    "items": [
      {
        "_id": "...",
        "product": {
          "_id": "...",
          "name": "Wireless Bluetooth Headphones",
          "price": 199.99,
          "image": "https://..."
        },
        "quantity": 2,
        "price": 199.99
      }
    ],
    "totalPrice": 399.98,
    "totalItems": 2
  }
}
```

#### Add to Cart
```http
POST /api/cart
```

**Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": { /* cart object */ }
}
```

#### Update Cart Item
```http
PUT /api/cart/:itemId
```

**Body:**
```json
{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/:itemId
```

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": { /* updated cart */ }
}
```

### Checkout

#### Process Checkout
```http
POST /api/checkout
```

**Headers:**
- `x-user-id` (optional)

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "ORD-1699...",
    "orderNumber": "ORD-1699...",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [...],
    "summary": {
      "subtotal": 399.98,
      "tax": "40.00",
      "total": "439.98"
    },
    "totalItems": 2,
    "totalAmount": 439.98,
    "timestamp": "2024-11-08T...",
    "status": "completed",
    "paymentStatus": "paid"
  }
}
```

## 🔒 Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing

Test the API using tools like:
- **Postman**: Import endpoints and test
- **Thunder Client**: VS Code extension
- **cURL**: Command line testing

Example cURL:
```bash
# Get products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"PRODUCT_ID","quantity":1}'
```

## 🗄️ Database Models

### Product Schema
- name, description, price, image
- category, stock, rating
- Timestamps, indexes for performance

### Cart Schema
- userId, items (array of products)
- Auto-calculated totals
- Status tracking (active/completed)

### Order Schema
- orderId (auto-generated)
- Customer info, items, totals
- Payment and order status

## 🌟 Production Features

✅ **Scalable Architecture**: MVC pattern with separation of concerns  
✅ **Input Validation**: Express-validator on all routes  
✅ **Error Handling**: Centralized error middleware  
✅ **Security**: Helmet, CORS, input sanitization  
✅ **Database Optimization**: Indexes, virtuals, static methods  
✅ **Stock Management**: Real-time stock checking  
✅ **Auto-calculations**: Cart totals, order summaries  
✅ **Logging**: Request logging with Morgan  

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in `.env`

### Local Development
```bash
npm run dev
```

## 📝 Notes

- Mock user system: Uses `x-user-id` header or defaults to `mock-user-123`
- All monetary values in USD
- Stock automatically decremented on checkout
- 10% tax applied at checkout
- Auto-generated unique order IDs

## 🤝 Contributing

This is a technical assessment project. Code structure follows production best practices:
- Clean code principles
- DRY (Don't Repeat Yourself)
- Separation of concerns
- Error handling
- Input validation
- Database optimization

## 📄 License

MIT