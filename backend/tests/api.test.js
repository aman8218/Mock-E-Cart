// tests/api.test.js
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const USER_ID = 'mock-user-123';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Helper function to log test results
function logTest(testName, passed, message = '') {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`${colors.green}✓ PASS${colors.reset} - ${testName}`);
  } else {
    failedTests++;
    console.log(`${colors.red}✗ FAIL${colors.reset} - ${testName}`);
    if (message) console.log(`  ${colors.yellow}${message}${colors.reset}`);
  }
}

// Helper function to print section headers
function printSection(title) {
  console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.magenta}${title}${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
}

// Store IDs for later tests
let productId = null;
let cartItemId = null;

// Delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
  console.log(`\n${colors.magenta}🚀 Starting Vibe Commerce API Tests...${colors.reset}\n`);
  
  try {
    // ==================== HEALTH CHECK ====================
    printSection('1️⃣  HEALTH CHECK');
    
    try {
      const response = await axios.get('http://localhost:5000/health');
      logTest('Server Health Check', response.data.status === 'OK');
    } catch (error) {
      logTest('Server Health Check', false, error.message);
      console.log(`\n${colors.red}❌ Server is not running! Start the server first: npm run dev${colors.reset}\n`);
      return;
    }

    // ==================== PRODUCTS API ====================
    printSection('2️⃣  PRODUCTS API TESTS');

    // Test 1: Get All Products
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      const isValid = response.data.success && response.data.count >= 1;
      logTest('Get All Products', isValid);
      
      if (isValid && response.data.data.length > 0) {
        productId = response.data.data[0]._id;
        console.log(`  ${colors.yellow}→ Saved Product ID: ${productId}${colors.reset}`);
      }
    } catch (error) {
      logTest('Get All Products', false, error.message);
    }

    await delay(200);

    // Test 2: Get Products by Category
    try {
      const response = await axios.get(`${BASE_URL}/products?category=Electronics`);
      const isValid = response.data.success && response.data.data.every(p => p.category === 'Electronics');
      logTest('Filter by Category (Electronics)', isValid);
    } catch (error) {
      logTest('Filter by Category (Electronics)', false, error.message);
    }

    await delay(200);

    // Test 3: Filter by Price Range
    try {
      const response = await axios.get(`${BASE_URL}/products?minPrice=50&maxPrice=100`);
      const isValid = response.data.success && response.data.data.every(p => p.price >= 50 && p.price <= 100);
      logTest('Filter by Price Range ($50-$100)', isValid);
    } catch (error) {
      logTest('Filter by Price Range ($50-$100)', false, error.message);
    }

    await delay(200);

    // Test 4: Sort Products
    try {
      const response = await axios.get(`${BASE_URL}/products?sort=price-asc`);
      const prices = response.data.data.map(p => p.price);
      const isSorted = prices.every((price, i) => i === 0 || price >= prices[i - 1]);
      logTest('Sort Products by Price (Ascending)', isSorted);
    } catch (error) {
      logTest('Sort Products by Price (Ascending)', false, error.message);
    }

    await delay(200);

    // Test 5: Get Single Product
    if (productId) {
      try {
        const response = await axios.get(`${BASE_URL}/products/${productId}`);
        const isValid = response.data.success && response.data.data._id === productId;
        logTest('Get Single Product by ID', isValid);
      } catch (error) {
        logTest('Get Single Product by ID', false, error.message);
      }
    } else {
      logTest('Get Single Product by ID', false, 'No product ID available');
    }

    await delay(200);

    // Test 6: Invalid Product ID
    try {
      await axios.get(`${BASE_URL}/products/invalid-id-123`);
      logTest('Invalid Product ID Error Handling', false, 'Should return 404');
    } catch (error) {
      logTest('Invalid Product ID Error Handling', error.response?.status === 404);
    }

    await delay(200);

    // ==================== CART API ====================
    printSection('3️⃣  CART API TESTS');

    // Test 7: Get Empty Cart
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: { 'x-user-id': USER_ID }
      });
      const isValid = response.data.success && response.data.data.totalItems === 0;
      logTest('Get Empty Cart (First Time)', isValid);
    } catch (error) {
      logTest('Get Empty Cart (First Time)', false, error.message);
    }

    await delay(200);

    // Test 8: Add Item to Cart
    if (productId) {
      try {
        const response = await axios.post(`${BASE_URL}/cart`, {
          productId: productId,
          quantity: 2
        }, {
          headers: { 'x-user-id': USER_ID }
        });
        const isValid = response.data.success && response.data.data.totalItems === 2;
        logTest('Add Item to Cart (Quantity: 2)', isValid);
        
        if (isValid && response.data.data.items.length > 0) {
          cartItemId = response.data.data.items[0]._id;
          console.log(`  ${colors.yellow}→ Saved Cart Item ID: ${cartItemId}${colors.reset}`);
        }
      } catch (error) {
        logTest('Add Item to Cart (Quantity: 2)', false, error.message);
      }
    } else {
      logTest('Add Item to Cart (Quantity: 2)', false, 'No product ID available');
    }

    await delay(200);

    // Test 9: Add Same Item Again (Should Update Quantity)
    if (productId) {
      try {
        const response = await axios.post(`${BASE_URL}/cart`, {
          productId: productId,
          quantity: 1
        }, {
          headers: { 'x-user-id': USER_ID }
        });
        const item = response.data.data.items.find(i => i.product._id === productId);
        const isValid = response.data.success && item.quantity === 3;
        logTest('Add Same Item (Should Increment to 3)', isValid);
      } catch (error) {
        logTest('Add Same Item (Should Increment to 3)', false, error.message);
      }
    } else {
      logTest('Add Same Item (Should Increment to 3)', false, 'No product ID available');
    }

    await delay(200);

    // Test 10: Get Cart with Items
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: { 'x-user-id': USER_ID }
      });
      const isValid = response.data.success && response.data.data.items.length > 0;
      logTest('Get Cart with Items', isValid);
    } catch (error) {
      logTest('Get Cart with Items', false, error.message);
    }

    await delay(200);

    // Test 11: Update Cart Item Quantity
    if (cartItemId) {
      try {
        const response = await axios.put(`${BASE_URL}/cart/${cartItemId}`, {
          quantity: 5
        }, {
          headers: { 'x-user-id': USER_ID }
        });
        const item = response.data.data.items.find(i => i._id === cartItemId);
        const isValid = response.data.success && item.quantity === 5;
        logTest('Update Cart Item Quantity to 5', isValid);
      } catch (error) {
        logTest('Update Cart Item Quantity to 5', false, error.message);
      }
    } else {
      logTest('Update Cart Item Quantity to 5', false, 'No cart item ID available');
    }

    await delay(200);

    // Test 12: Add Item with Invalid Product ID
    try {
      await axios.post(`${BASE_URL}/cart`, {
        productId: 'invalid-product-id-12345',
        quantity: 1
      }, {
        headers: { 'x-user-id': USER_ID }
      });
      logTest('Invalid Product ID Error in Cart', false, 'Should return 404');
    } catch (error) {
      logTest('Invalid Product ID Error in Cart', error.response?.status === 404 || error.response?.status === 400);
    }

    await delay(200);

    // Test 13: Add Item without Product ID (Validation)
    try {
      await axios.post(`${BASE_URL}/cart`, {
        quantity: 1
      }, {
        headers: { 'x-user-id': USER_ID }
      });
      logTest('Validation Error (Missing Product ID)', false, 'Should return 400');
    } catch (error) {
      logTest('Validation Error (Missing Product ID)', error.response?.status === 400);
    }

    await delay(200);

    // ==================== CHECKOUT API ====================
    printSection('4️⃣  CHECKOUT API TESTS');

    // Test 14: Checkout with Valid Data
    try {
      const response = await axios.post(`${BASE_URL}/checkout`, {
        name: 'John Doe',
        email: 'john@example.com'
      }, {
        headers: { 'x-user-id': USER_ID }
      });
      const isValid = response.data.success && 
                     response.data.data.orderId && 
                     response.data.data.customer.name === 'John Doe';
      logTest('Checkout with Valid Data', isValid);
      
      if (isValid) {
        console.log(`  ${colors.yellow}→ Order ID: ${response.data.data.orderId}${colors.reset}`);
        console.log(`  ${colors.yellow}→ Total Amount: $${response.data.data.totalAmount}${colors.reset}`);
      }
    } catch (error) {
      logTest('Checkout with Valid Data', false, error.response?.data?.error || error.message);
    }

    await delay(200);

    // Test 15: Verify Cart Cleared After Checkout
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: { 'x-user-id': USER_ID }
      });
      const isValid = response.data.success && response.data.data.totalItems === 0;
      logTest('Cart Cleared After Checkout', isValid);
    } catch (error) {
      logTest('Cart Cleared After Checkout', false, error.message);
    }

    await delay(200);

    // Test 16: Checkout with Empty Cart
    try {
      await axios.post(`${BASE_URL}/checkout`, {
        name: 'John Doe',
        email: 'john@example.com'
      }, {
        headers: { 'x-user-id': USER_ID }
      });
      logTest('Empty Cart Error Handling', false, 'Should return 400');
    } catch (error) {
      const isValid = error.response?.status === 400 && 
                     error.response?.data?.error === 'Cart is empty';
      logTest('Empty Cart Error Handling', isValid);
    }

    await delay(200);

    // Test 17: Checkout without Name
    // First add an item again
    if (productId) {
      await axios.post(`${BASE_URL}/cart`, {
        productId: productId,
        quantity: 1
      }, {
        headers: { 'x-user-id': USER_ID }
      });

      await delay(200);

      try {
        await axios.post(`${BASE_URL}/checkout`, {
          email: 'john@example.com'
        }, {
          headers: { 'x-user-id': USER_ID }
        });
        logTest('Validation Error (Missing Name)', false, 'Should return 400');
      } catch (error) {
        logTest('Validation Error (Missing Name)', error.response?.status === 400);
      }
    }

    await delay(200);

    // Test 18: Checkout with Invalid Email
    try {
      await axios.post(`${BASE_URL}/checkout`, {
        name: 'John Doe',
        email: 'invalid-email'
      }, {
        headers: { 'x-user-id': USER_ID }
      });
      logTest('Validation Error (Invalid Email)', false, 'Should return 400');
    } catch (error) {
      logTest('Validation Error (Invalid Email)', error.response?.status === 400);
    }

    await delay(200);

    // Test 19: Remove Item from Cart
    // Re-add item and get new cart item ID
    if (productId) {
      const cartResponse = await axios.get(`${BASE_URL}/cart`, {
        headers: { 'x-user-id': USER_ID }
      });
      
      if (cartResponse.data.data.items.length > 0) {
        const itemToRemove = cartResponse.data.data.items[0]._id;
        
        try {
          const response = await axios.delete(`${BASE_URL}/cart/${itemToRemove}`, {
            headers: { 'x-user-id': USER_ID }
          });
          const isValid = response.data.success;
          logTest('Remove Item from Cart', isValid);
        } catch (error) {
          logTest('Remove Item from Cart', false, error.message);
        }
      }
    }

    await delay(200);

    // Test 20: Clear Entire Cart
    try {
      const response = await axios.delete(`${BASE_URL}/cart`, {
        headers: { 'x-user-id': USER_ID }
      });
      const isValid = response.data.success && response.data.data.totalItems === 0;
      logTest('Clear Entire Cart', isValid);
    } catch (error) {
      logTest('Clear Entire Cart', false, error.message);
    }

  } catch (error) {
    console.error(`\n${colors.red}Fatal Error:${colors.reset}`, error.message);
  }

  // ==================== SUMMARY ====================
  printSection('📊 TEST SUMMARY');
  
  console.log(`Total Tests: ${totalTests}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  
  if (failedTests === 0) {
    console.log(`\n${colors.green}🎉 ALL TESTS PASSED! Backend is production-ready!${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}⚠️  Some tests failed. Please check the errors above.${colors.reset}\n`);
  }
}

// Run the tests
runTests();