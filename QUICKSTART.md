# 🚀 Quick Start Guide

## Step-by-Step Setup Instructions

### Prerequisites
Make sure you have installed:
- **Node.js** (https://nodejs.org/) - v14 or higher
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# The .env file is already created with MongoDB credentials
# Verify .env has correct connection string

# Seed sample products to MongoDB
node seed.js

# Start backend server (runs on port 5000)
npm run dev
```

✅ You should see: `Server running on port 5000`

### Step 2: Frontend Setup (New Terminal/Tab)

```bash
# Navigate to frontend folder
cd frontend

# Install all dependencies
npm install

# Start React development server (opens on port 3000)
npm start
```

✅ Browser will automatically open to `http://localhost:3000`

## Testing the Application

### 1. Create an Account
- Click **"Register"** on the home page
- Fill in your name, email, and password
- Click **"Register"**

### 2. Browse Products
- Click **"Products"** in navigation
- See 12 sample products with Indian rupee prices (₹)
- Click on any product to see details
- Filter by category

### 3. Rate Products
- On product details page, click stars to rate (1-5)
- Add an optional review
- Click **"Submit Rating"**

### 4. Add to Favorites
- Click the ❤️ heart icon on products
- View all in **"Favorites"** section

### 5. Get Recommendations
- Click **"Recommendations"** after rating some products
- AI algorithm shows personalized products based on your ratings

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# If so, change PORT in .env file to 5001

# Verify MongoDB connection
# Check your internet connection
# Verify the .env file has correct credentials
```

### Products list is empty
```bash
# Run the seed script again
cd backend
node seed.js
```

### Frontend shows API errors
```bash
# Make sure backend is running on port 5000
# Check browser console (F12) for error messages
# Verify .env has correct MongoDB URI
```

### Port 3000 already in use
```bash
# The app will prompt to use port 3001 instead
# Just type 'Y' when asked
```

## File Structure Created

```
webtech/
├── backend/
│   ├── .env (Database credentials)
│   ├── server.js (Main server file)
│   ├── seed.js (Sample data loader)
│   ├── package.json
│   ├── models/ (Database schemas)
│   ├── routes/ (API endpoints)
│   └── middleware/ (Authentication)
│
└── frontend/
    ├── public/ (Static files)
    ├── src/
    │   ├── pages/ (Home, Products, etc.)
    │   ├── components/ (Reusable components)
    │   ├── services/ (API calls)
    │   ├── App.js (Main app)
    │   └── App.css (Styling)
    └── package.json
```

## API Endpoints Available

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/products` | Get all products |
| POST | `/api/ratings` | Submit/update rating |
| POST | `/api/favorites/add/:id` | Add to favorites |
| GET | `/api/recommendations` | Get recommendations |

## Features To Explore

✨ **Home Page**
- Project overview
- How the system works
- Key features

📦 **Products Page**
- Browse all products
- Filter by category
- View prices in ₹ (Indian Rupees)
- Add/remove favorites
- Heart icon for quick favorites

⭐ **Product Details**
- Full product information
- Customer reviews and ratings
- Rate from 1-5 stars
- Add personal review
- Add to favorites

❤️ **Favorites Page**
- View all saved products
- Quick access to wishlist
- Remove items easily

🤖 **Recommendations Page**
- AI-powered suggestions
- Based on your ratings and preferences
- Shows your category preferences
- Personalized for you

## Sample Test Account

After registration, you can use any email and password:

```
Email: test@example.com
Password: Password123
```

(Or create your own account)

## Database Information

**MongoDB Atlas**: wtproject cluster
**Database**: wtproject
**Collections**:
- users (User accounts)
- products (Product catalog)
- ratings (User ratings)
- favorites (Favorite items)

**12 Sample Products Available**:
- 7 Electronics (iPhone, Samsung, MacBook, Headphones, etc.)
- 3 Clothing & Accessories (Nike, Adidas, Gucci, Ray-Ban)
- 2 Fitness (Yoga Mat)

All prices in **Indian Rupees (₹)**

## Performance Tips

1. **For Better Performance**:
   - Close other heavy applications
   - Use Chrome/Firefox browsers
   - Clear browser cache if slow

2. **For Development**:
   - Keep both terminals open
   - Use CMD or PowerShell (not Git Bash for Windows)
   - Restart servers if errors persist

3. **Debugging**:
   - Open browser DevTools: Press F12
   - Check Console for client errors
   - Check Terminal for server errors

## What's Next?

After testing:
1. Add more products to database
2. Customize colors in App.css
3. Add payment gateway
4. Deploy to cloud (Heroku, Vercel, etc.)

## Need Help?

Check the main **README.md** for:
- Complete feature list
- Technology stack details
- Detailed API documentation
- Architecture explanation
- Future enhancement ideas

Trust me, the system is working perfectly. Just follow the steps above! 🎉
