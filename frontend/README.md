# Vibe Commerce - Frontend

Modern, responsive React frontend for the Vibe Commerce e-commerce platform built with Tailwind CSS.

## 🚀 Features

✅ **Modern UI/UX** - Beautiful gradient design with smooth animations  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Product Browsing** - Grid layout with search, filters, and sorting  
✅ **Shopping Cart** - Add, update, remove items with live updates  
✅ **Checkout Flow** - Simple form with validation and receipt modal  
✅ **Alert System** - Beautiful Tailwind alerts for user feedback  
✅ **Loading States** - Smooth loading indicators throughout  
✅ **Error Handling** - User-friendly error messages  
✅ **Context API** - Clean state management  

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable components
│   │   ├── Alert.js
│   │   ├── Footer.js
│   │   ├── Loading.js
│   │   ├── Navbar.js
│   │   └── ProductCard.js
│   ├── context/             # React Context
│   │   ├── AlertContext.js
│   │   └── CartContext.js
│   ├── pages/               # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── Cart.js
│   │   └── Checkout.js
│   ├── services/            # API services
│   │   └── api.js
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Tailwind styles
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Installation

### Prerequisites
- Node.js v14 or higher
- Backend API running on port 5000

### Setup Steps

1. **Navigate to frontend folder**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_USER_ID=mock-user-123
```

4. **Start development server**
```bash
npm start
```

App will open at `http://localhost:3000`

## 📱 Pages

### 1. Home (`/`)
- Hero section with CTA
- Feature highlights
- Category navigation
- Responsive design

### 2. Products (`/products`)
- Product grid (responsive: 1-4 columns)
- Advanced filters:
  - Search by name
  - Filter by category
  - Sort by price/name/rating
  - Price range filter
- Real-time filtering

### 3. Cart (`/cart`)
- Cart items with images
- Quantity controls (+/-)
- Remove items
- Order summary
- Sticky sidebar on desktop
- Empty cart state

### 4. Checkout (`/checkout`)
- Customer information form
- Form validation
- Order summary
- Receipt modal on success
- Auto-redirect after completion

## 🎨 Design System

### Colors
- **Primary**: Purple-blue gradient (#667eea)
- **Secondary**: Purple gradient (#764ba2)
- **Accent**: Red for alerts/badges
- **Neutral**: Gray scale

### Animations
- Fade in/out
- Slide up/down
- Bounce (cart badge)
- Hover scale effects
- Loading spinners

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔔 Alert System

Custom Tailwind-based alerts with 4 types:

```javascript
// Usage in components
import { useAlert } from '../context/AlertContext';

const { success, error, warning, info } = useAlert();

success('Item added to cart!');
error('Failed to load products');
warning('Low stock!');
info('Tip: Use filters to narrow results');
```

**Features:**
- Auto-dismiss after 5 seconds
- Manual dismiss button
- Slide-down animation
- Color-coded by type
- Stacked display

## 🛒 Cart Context

Global cart state management:

```javascript
import { useCart } from '../context/CartContext';

const {
  cart,              // Cart object
  cartCount,         // Total items
  loading,           // Loading state
  addToCart,         // Add item function
  updateCartItem,    // Update quantity
  removeFromCart,    // Remove item
  clearCart,         // Clear all items
  refreshCart        // Refresh cart data
} = useCart();
```

## 📡 API Integration

All API calls handled through `src/services/api.js`:

```javascript
import { productAPI, cartAPI, checkoutAPI } from '../services/api';

// Get products
const products = await productAPI.getAll();

// Add to cart
await cartAPI.add(productId, quantity);

// Checkout
const receipt = await checkoutAPI.process({ name, email });
```

## 🎯 Key Features Explained

### 1. Product Card
- Image with hover zoom
- Category and stock badges
- Rating display
- Add to cart button with states (loading/added)
- Responsive layout

### 2. Filters
- URL-based (shareable links)
- Debounced search
- Clear filters button
- Active filter indicators

### 3. Cart Management
- Real-time quantity updates
- Stock validation
- Subtotal calculations
- Tax computation (10%)
- Smooth animations

### 4. Checkout Flow
1. Form validation (name, email)
2. Order submission
3. Receipt modal display
4. Cart auto-clear
5. Redirect to products

## 🚀 Building for Production

```bash
# Create optimized build
npm run build

# Preview production build
npx serve -s build
```

Build output will be in `build/` folder.

## 🧪 Testing the Frontend

### Manual Testing Checklist

**Home Page:**
- [ ] Hero section displays correctly
- [ ] Category links work
- [ ] Responsive on mobile/tablet/desktop

**Products Page:**
- [ ] Products load successfully
- [ ] Search filters products
- [ ] Category filter works
- [ ] Sort options work
- [ ] Price range filter works
- [ ] "Add to Cart" button works
- [ ] Loading states display

**Cart Page:**
- [ ] Cart items display
- [ ] Quantity +/- buttons work
- [ ] Remove button works
- [ ] Totals calculate correctly
- [ ] Empty cart state displays
- [ ] Responsive layout

**Checkout Page:**
- [ ] Form validation works
- [ ] Can't submit with errors
- [ ] Order processes successfully
- [ ] Receipt modal displays
- [ ] Cart clears after checkout

**Alerts:**
- [ ] Success alerts show (green)
- [ ] Error alerts show (red)
- [ ] Auto-dismiss after 5s
- [ ] Manual dismiss works

## 🎨 Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR',
        600: '#YOUR_COLOR',
      }
    }
  }
}
```

### Add New Product Category

1. Update backend seed data
2. Add category to `src/pages/Home.js` categories array
3. Add category to `src/pages/Products.js` categories array

## 📦 Dependencies

**Core:**
- react ^18.3.1
- react-dom ^18.3.1
- react-router-dom ^6.26.0

**Utilities:**
- axios ^1.7.7 (API calls)
- react-icons ^5.3.0 (icons)

**Styling:**
- tailwindcss ^3.4.1
- postcss ^8.4.35
- autoprefixer ^10.4.18

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:** Ensure backend is running on port 5000

### Issue: "Products not loading"
**Solution:** Check backend seeded products: `npm run seed`

### Issue: "Styles not applying"
**Solution:** Restart dev server after Tailwind config changes

### Issue: "Cart not updating"
**Solution:** Check browser console for API errors

## 🌟 Production Checklist

- [ ] Environment variables configured
- [ ] Backend URL updated for production
- [ ] Images optimized
- [ ] Build tested (`npm run build`)
- [ ] Responsive design verified
- [ ] All features tested
- [ ] Error handling verified
- [ ] Loading states work
- [ ] SEO meta tags added
- [ ] Analytics integrated (optional)

## 📸 Screenshots

*Add screenshots here after deployment*

- Home page
- Products grid
- Cart page
- Checkout form
- Receipt modal

## 🤝 Contributing

This is a technical assessment project showcasing:
- Modern React patterns (Hooks, Context)
- Clean component architecture
- Responsive design with Tailwind
- User experience best practices
- Production-ready code quality

## 📄 License

MIT License - Created for Vibe Commerce Internship Assessment

---

**Built with ❤️ using React + Tailwind CSS**