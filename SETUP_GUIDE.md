# 🚀 Complete Setup Guide - Vibe Commerce

Step-by-step guide to get the application running on your machine.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js v14 or higher installed
- [ ] MongoDB installed and running
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

### Check Installations

```bash
# Check Node.js version
node --version
# Should show v14.x or higher

# Check npm version
npm --version

# Check MongoDB
mongod --version

# Check Git
git --version
```

---

## 🗂️ Project Structure Setup

### Step 1: Create Project Folders

```bash
# Create main project folder
mkdir Mock-E-Cart
cd Mock-E-Cart

# Create backend and frontend folders
mkdir backend frontend
```

### Step 2: Copy Backend Files

Create these folders and files in `backend/`:

```
backend/
├── controllers/
│   ├── productController.js
│   ├── cartController.js
│   └── checkoutController.js
├── models/
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── checkoutRoutes.js
├── middleware/
│   ├── errorHandler.js
│   └── validate.js
├── utils/
│   ├── asyncHandler.js
│   └── AppError.js
├── scripts/
│   └── seedProducts.js
├── tests/
│   └── api.test.js
├── server.js
├── package.json
├── .env
├── .env.example
├── .gitignore
└── README.md
```

Copy all the backend code from the artifacts above into these files.

### Step 3: Copy Frontend Files

Create these folders and files in `frontend/`:

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Alert.js
│   │   ├── Footer.js
│   │   ├── Loading.js
│   │   ├── Navbar.js
│   │   └── ProductCard.js
│   ├── context/
│   │   ├── AlertContext.js
│   │   └── CartContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── Cart.js
│   │   └── Checkout.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

Copy all the frontend code from the artifacts above into these files.

---

## 🔧 Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- helmet
- morgan
- express-validator
- axios (for testing)
- nodemon (dev dependency)

### Step 2: Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
DEFAULT_USER_ID=mock-user-123
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Start MongoDB

**Windows:**
MongoDB should start automatically, or:
```bash
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 4: Seed the Database

```bash
npm run seed
```

Expected output:
```
✅ MongoDB Connected
🗑️  Cleared existing products
✅ Products seeded successfully
📦 Added 10 products to database
```

### Step 5: Start Backend Server

```bash
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
📍 Environment: development
✅ MongoDB Connected Successfully
```

### Step 6: Test Backend (Optional)

Open a new terminal:
```bash
cd backend
npm test
```

Expected result: All 20 tests should pass! ✅

---

## 🎨 Frontend Setup

### Step 1: Install Frontend Dependencies

Open a **NEW terminal** (keep backend running):

```bash
cd frontend
npm install
```

This will install:
- react, react-dom
- react-router-dom
- axios
- react-icons
- tailwindcss, postcss, autoprefixer
- react-scripts

### Step 2: Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_USER_ID=mock-user-123
```

### Step 3: Start Frontend Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

Expected: Browser opens with the Vibe Commerce home page! 🎉

---

## ✅ Verification Checklist

### Backend Verification

Access these URLs in browser or Postman:

- [ ] http://localhost:5000/health → Returns `{"status": "OK"}`
- [ ] http://localhost:5000/api/products → Returns array of 10 products
- [ ] http://localhost:5000/api/cart → Returns empty cart

### Frontend Verification

- [ ] Home page loads with hero section
- [ ] "Start Shopping" button works
- [ ] Navbar shows cart count (0)
- [ ] Footer displays

### Full Flow Test

1. [ ] Click "Start Shopping" → Goes to Products page
2. [ ] Products display in grid (10 products)
3. [ ] Click "Add to Cart" on a product → Shows success alert
4. [ ] Cart badge updates in navbar
5. [ ] Click Cart icon → Shows cart with item
6. [ ] Update quantity → Cart total updates
7. [ ] Click "Proceed to Checkout"
8. [ ] Fill in name and email → Submit
9. [ ] Receipt modal appears with order details
10. [ ] Cart is cleared

---

## 🐛 Troubleshooting

### Backend Issues

**Issue: "Cannot find module"**
```bash
# Solution: Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Issue: "MongoDB connection failed"**
```bash
# Solution: Check if MongoDB is running
mongosh
# Should connect successfully

# Or restart MongoDB
# Windows: net start MongoDB
# Mac: brew services restart mongodb-community
# Linux: sudo systemctl restart mongod
```

**Issue: "Port 5000 already in use"**
```bash
# Solution: Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

**Issue: "Products not found"**
```bash
# Solution: Reseed database
cd backend
npm run seed
```

### Frontend Issues

**Issue: "Cannot connect to backend"**
- Make sure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend/.env

**Issue: "Styles not loading"**
```bash
# Solution: Restart dev server
# Press Ctrl+C to stop
npm start
```

**Issue: "Module not found"**
```bash
# Solution: Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Testing on Different Devices

### Desktop Testing
- Chrome, Firefox, Safari, Edge
- Test responsive design with DevTools (F12)

### Mobile Testing
1. Get your local IP:
```bash
# Windows
ipconfig
# Mac/Linux
ifconfig
```

2. Update frontend/.env:
```env
REACT_APP_API_URL=http://YOUR_IP:5000/api
```

3. Access on mobile: `http://YOUR_IP:3000`

---

## 🎯 Next Steps

Once everything is running:

1. ✅ Test all features manually
2. ✅ Run backend tests: `npm test`
3. ✅ Take screenshots
4. ✅ Record demo video (1-2 min)
5. ✅ Push to GitHub
6. ✅ Submit assignment

---

## 📦 Git Setup

```bash
# Initialize git (from project root)
cd Mock-E-Cart
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete MERN e-commerce app"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/mock-e-cart.git

# Push
git push -u origin main
```

---

## 🚀 Production Build (Optional)

### Backend
```bash
cd backend
# Set NODE_ENV=production in .env
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Creates optimized build in build/ folder

# Serve locally
npx serve -s build
# Access at http://localhost:3000
```

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide again
2. Review error messages carefully
3. Check README files in backend/ and frontend/
4. Ensure all prerequisites are installed
5. Verify MongoDB is running
6. Check console for errors

---

## ✨ You're All Set!

Your full-stack Vibe Commerce application is now running! 🎉

**What you have:**
- ✅ Production-ready backend API
- ✅ Beautiful React frontend
- ✅ Complete e-commerce flow
- ✅ Automated testing
- ✅ Comprehensive documentation

**Ready to submit your assignment!** 🚀