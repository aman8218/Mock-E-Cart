# Backend API Manual Testing Script

## Prerequisites
- Backend server running on `http://localhost:5000`
- MongoDB connected and seeded with products
- Tool: Use **Thunder Client** (VS Code), **Postman**, or **cURL**

---

## 1️⃣ Health Check

### Test: Server is Running
```bash
GET http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-11-08T..."
}
```

---

## 2️⃣ Products API Testing

### Test 1: Get All Products
```bash
GET http://localhost:5000/api/products
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Wireless Bluetooth Headphones",
      "description": "Premium noise-cancelling...",
      "price": 199.99,
      "image": "https://...",
      "category": "Electronics",
      "stock": 50,
      "rating": 4.8,
      "createdAt": "..."
    }
  ]
}
```
✅ **Pass Criteria:** Returns 10 products with all fields

---

### Test 2: Get Products by Category
```bash
GET http://localhost:5000/api/products?category=Electronics
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [/* Only Electronics products */]
}
```
✅ **Pass Criteria:** Returns only Electronics category products

---

### Test 3: Filter by Price Range
```bash
GET http://localhost:5000/api/products?minPrice=50&maxPrice=100
```

**Expected Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [/* Products between $50-$100 */]
}
```
✅ **Pass Criteria:** All products have price between 50 and 100

---

### Test 4: Sort Products
```bash
GET http://localhost:5000/api/products?sort=price-asc
```

**Expected Response:**
```json
{
  "success": true,
  "data": [/* Products sorted by price ascending */]
}
```
✅ **Pass Criteria:** Products sorted by price (lowest to highest)

---

### Test 5: Get Single Product
**First, copy a product `_id` from the products list, then:**

```bash
GET http://localhost:5000/api/products/{PRODUCT_ID}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Wireless Bluetooth Headphones",
    "price": 199.99,
    ...
  }
}
```
✅ **Pass Criteria:** Returns single product with matching ID

---

### Test 6: Invalid Product ID
```bash
GET http://localhost:5000/api/products/invalid-id-123
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```
✅ **Pass Criteria:** Returns 404 error

---

## 3️⃣ Cart API Testing

### Test 7: Get Empty Cart (First Time)
```bash
GET http://localhost:5000/api/cart
```

**Headers:**
```
x-user-id: mock-user-123
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "userId": "mock-user-123",
    "items": [],
    "totalPrice": 0,
    "totalItems": 0,
    "status": "active"
  }
}
```
✅ **Pass Criteria:** Returns empty cart

---

### Test 8: Add Item to Cart
**Copy a product ID from products list, then:**

```bash
POST http://localhost:5000/api/cart
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "productId": "PASTE_PRODUCT_ID_HERE",
  "quantity": 2
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "items": [
      {
        "_id": "...",
        "product": {
          "_id": "...",
          "name": "Wireless Bluetooth Headphones",
          "price": 199.99
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
✅ **Pass Criteria:** Item added, totals calculated correctly (2 × 199.99 = 399.98)

---

### Test 9: Add Another Item to Cart
**Use a different product ID:**

```bash
POST http://localhost:5000/api/cart
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "productId": "ANOTHER_PRODUCT_ID",
  "quantity": 1
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "items": [/* 2 items now */],
    "totalPrice": /* Updated total */,
    "totalItems": 3
  }
}
```
✅ **Pass Criteria:** Cart now has 2 different products, totals updated

---

### Test 10: Add Same Item Again (Should Update Quantity)
**Use the same product ID from Test 8:**

```bash
POST http://localhost:5000/api/cart
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "productId": "SAME_PRODUCT_ID_AS_TEST_8",
  "quantity": 1
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "items": [
      {
        "quantity": 3  /* Should be 2+1=3 now */
      }
    ],
    "totalItems": 4
  }
}
```
✅ **Pass Criteria:** Quantity incremented, not duplicated

---

### Test 11: Get Cart with Items
```bash
GET http://localhost:5000/api/cart
x-user-id: mock-user-123
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "items": [/* All cart items */],
    "totalPrice": /* Calculated total */,
    "totalItems": 4
  }
}
```
✅ **Pass Criteria:** Returns cart with all items

---

### Test 12: Update Cart Item Quantity
**Copy a cart item `_id` from the cart response, then:**

```bash
PUT http://localhost:5000/api/cart/{CART_ITEM_ID}
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "quantity": 5
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cart updated",
  "data": {
    "items": [
      {
        "_id": "...",
        "quantity": 5  /* Updated */
      }
    ],
    "totalItems": /* Updated */
  }
}
```
✅ **Pass Criteria:** Quantity updated, totals recalculated

---

### Test 13: Remove Item from Cart
**Use a cart item ID:**

```bash
DELETE http://localhost:5000/api/cart/{CART_ITEM_ID}
x-user-id: mock-user-123
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": {
    "items": [/* One less item */],
    "totalPrice": /* Updated */,
    "totalItems": /* Reduced */
  }
}
```
✅ **Pass Criteria:** Item removed, totals updated

---

### Test 14: Add Item with Invalid Product ID
```bash
POST http://localhost:5000/api/cart
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "productId": "invalid-product-id",
  "quantity": 1
}
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```
✅ **Pass Criteria:** Returns 404 error

---

### Test 15: Add Item without Product ID
```bash
POST http://localhost:5000/api/cart
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "quantity": 1
}
```

**Expected Response:**
```json
{
  "success": false,
  "errors": [
    {
      "field": "productId",
      "message": "Product ID is required"
    }
  ]
}
```
✅ **Pass Criteria:** Validation error returned

---

## 4️⃣ Checkout API Testing

### Test 16: Checkout with Valid Data
**Make sure your cart has items first (Tests 8-9), then:**

```bash
POST http://localhost:5000/api/checkout
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Expected Response:**
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
    "items": [
      {
        "id": "...",
        "name": "Wireless Bluetooth Headphones",
        "quantity": 2,
        "price": 199.99,
        "subtotal": 399.98
      }
    ],
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
✅ **Pass Criteria:** 
- Order created with unique ID
- Tax calculated (10%)
- Total = subtotal + tax
- Receipt contains all details

---

### Test 17: Verify Cart Cleared After Checkout
```bash
GET http://localhost:5000/api/cart
x-user-id: mock-user-123
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "items": [],
    "totalPrice": 0,
    "totalItems": 0
  }
}
```
✅ **Pass Criteria:** Cart is empty after successful checkout

---

### Test 18: Checkout with Empty Cart
**Make sure cart is empty, then:**

```bash
POST http://localhost:5000/api/checkout
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Cart is empty"
}
```
✅ **Pass Criteria:** Returns 400 error

---

### Test 19: Checkout without Name
**Add items to cart first, then:**

```bash
POST http://localhost:5000/api/checkout
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "email": "john@example.com"
}
```

**Expected Response:**
```json
{
  "success": false,
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```
✅ **Pass Criteria:** Validation error

---

### Test 20: Checkout with Invalid Email
```bash
POST http://localhost:5000/api/checkout
Content-Type: application/json
x-user-id: mock-user-123
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "invalid-email"
}
```

**Expected Response:**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```
✅ **Pass Criteria:** Email validation error

---

## 📊 Testing Summary Checklist

### Products API (6 tests)
- [ ] Get all products
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Sort products
- [ ] Get single product
- [ ] Invalid product ID error

### Cart API (9 tests)
- [ ] Get empty cart
- [ ] Add item to cart
- [ ] Add another item
- [ ] Update existing item quantity
- [ ] Get cart with items
- [ ] Update item quantity
- [ ] Remove item from cart
- [ ] Invalid product error
- [ ] Validation error

### Checkout API (5 tests)
- [ ] Successful checkout
- [ ] Cart cleared after checkout
- [ ] Empty cart error
- [ ] Missing name error
- [ ] Invalid email error

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /api/products"
**Solution:** Make sure server is running on port 5000

### Issue: "MongoServerError: connect ECONNREFUSED"
**Solution:** Start MongoDB or check MONGODB_URI in .env

### Issue: "Products not found"
**Solution:** Run seed script: `npm run seed`

### Issue: "Cast to ObjectId failed"
**Solution:** Use valid MongoDB ObjectId format (from actual products)

---

## 📝 Notes

1. Always use valid product IDs copied from GET /api/products response
2. Always use valid cart item IDs from GET /api/cart response
3. The `x-user-id` header is optional (defaults to mock-user-123)
4. Tax is automatically calculated as 10% of subtotal
5. Stock is decremented after successful checkout

---

## ✅ All Tests Passed?

If all 20 tests pass, your backend is **production-ready**! 🎉

Next step: Let me know and I'll create the React + Tailwind CSS frontend!