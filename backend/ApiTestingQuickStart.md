# 🧪 Automated API Testing - Quick Start

## Setup

1. **Make sure your backend server is running:**
```bash
cd backend
npm run dev
```

2. **In a NEW terminal, run the automated tests:**
```bash
npm test
```

That's it! All 20 tests will run automatically in one click! 🚀

---

## What the Test Script Does

The automated test script (`tests/api.test.js`) will:

### ✅ Test Products API (6 tests)
- Get all products
- Filter by category
- Filter by price range
- Sort products
- Get single product
- Error handling for invalid IDs

### ✅ Test Cart API (9 tests)
- Get empty cart
- Add items to cart
- Update quantities
- Increment existing items
- Get cart with items
- Remove items
- Clear cart
- Validation errors

### ✅ Test Checkout API (5 tests)
- Process checkout
- Verify cart cleared
- Empty cart errors
- Validation errors (name, email)

---

## Expected Output

You'll see colorful output like this:

```
🚀 Starting Vibe Commerce API Tests...

============================================================
1️⃣  HEALTH CHECK
============================================================

✓ PASS - Server Health Check

============================================================
2️⃣  PRODUCTS API TESTS
============================================================

✓ PASS - Get All Products
  → Saved Product ID: 673d8f9a2c4b5e001a9c1234
✓ PASS - Filter by Category (Electronics)
✓ PASS - Filter by Price Range ($50-$100)
✓ PASS - Sort Products by Price (Ascending)
✓ PASS - Get Single Product by ID
✓ PASS - Invalid Product ID Error Handling

============================================================
3️⃣  CART API TESTS
============================================================

✓ PASS - Get Empty Cart (First Time)
✓ PASS - Add Item to Cart (Quantity: 2)
  → Saved Cart Item ID: 673d8f9a2c4b5e001a9c5678
✓ PASS - Add Same Item (Should Increment to 3)
✓ PASS - Get Cart with Items
✓ PASS - Update Cart Item Quantity to 5
✓ PASS - Invalid Product ID Error in Cart
✓ PASS - Validation Error (Missing Product ID)

============================================================
4️⃣  CHECKOUT API TESTS
============================================================

✓ PASS - Checkout with Valid Data
  → Order ID: ORD-1699456789-ABC123XYZ
  → Total Amount: $999.95
✓ PASS - Cart Cleared After Checkout
✓ PASS - Empty Cart Error Handling
✓ PASS - Validation Error (Missing Name)
✓ PASS - Validation Error (Invalid Email)
✓ PASS - Remove Item from Cart
✓ PASS - Clear Entire Cart

============================================================
📊 TEST SUMMARY
============================================================

Total Tests: 20
Passed: 20
Failed: 0
Success Rate: 100.00%

🎉 ALL TESTS PASSED! Backend is production-ready!
```

---

## Test Features

### 🎨 Color-Coded Output
- **Green ✓** - Tests passed
- **Red ✗** - Tests failed
- **Yellow** - Important info (IDs, amounts)
- **Blue** - Section headers

### 🔄 Smart Testing
- Automatically saves IDs (product, cart item) for subsequent tests
- Tests are run sequentially with proper delays
- Comprehensive error handling
- Clear failure messages

### 📊 Summary Report
- Total tests run
- Pass/fail count
- Success rate percentage
- Final status message

---

## Troubleshooting

### ❌ "Server is not running!"
**Solution:** Start the backend server first:
```bash
npm run dev
```

### ❌ "Products not found"
**Solution:** Seed the database:
```bash
npm run seed
```

### ❌ Connection errors
**Solution:** Check MongoDB is running and .env is configured

### ❌ Some tests fail
**Solution:** Check the error messages - they'll tell you exactly what went wrong

---

## Continuous Testing (Watch Mode)

To run tests automatically on code changes:
```bash
npm run test:watch
```

This will re-run all tests whenever you modify the code!

---

## Manual Testing (Alternative)

If you prefer manual testing with Postman/Thunder Client, see `TESTING.md` for detailed manual test cases.

---

## Next Steps

Once all tests pass (100% success rate):
1. ✅ Backend is production-ready
2. ✅ All APIs working correctly
3. ✅ Error handling verified
4. 🚀 Ready for frontend development!

**Tell me when all tests pass and I'll create the React + Tailwind CSS frontend!** 🎉