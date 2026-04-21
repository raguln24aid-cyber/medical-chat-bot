# Smart E-Commerce Product Recommendation System

A full-stack e-commerce platform with AI-powered product recommendations, built with React, Node.js, Express, and MongoDB.

## Features

✨ **Core Features**
- User authentication (Register/Login with JWT)
- Browse products across multiple categories
- View detailed product information
- Rate products (1-5 stars) with reviews
- Mark favorite products
- AI-powered personalized recommendations
- Responsive and attractive UI

💰 **Pricing**
- All prices displayed in Indian Rupees (₹)
- Real product database with varying price ranges

🎨 **Design**
- Modern, gradient-based UI
- Mobile-responsive design
- Smooth animations and transitions
- Intuitive navigation

## Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- CSS3 with modern styling

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

**Database:**
- MongoDB Atlas (Cloud)

## Project Structure

```
webtech/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Rating.js
│   │   └── Favorite.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── ratings.js
│   │   ├── favorites.js
│   │   └── recommendations.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ProductCard.js
    │   │   └── RatingComponent.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Products.js
    │   │   ├── ProductDetails.js
    │   │   ├── Favorites.js
    │   │   └── Recommendations.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (connection string provided)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder with:
```
MONGODB_URI=mongodb+srv://raguln:ragul@02@wtproject.is2ofgm.mongodb.net/?appName=wtproject
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Seed sample products to database:
```bash
node seed.js
```

5. Start backend server:
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```
App will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Add new product (protected)

### Ratings
- `POST /api/ratings` - Add/update rating (protected)
- `GET /api/ratings/product/:productId` - Get all ratings for product
- `GET /api/ratings/:productId` - Get user's rating for product (protected)

### Favorites
- `GET /api/favorites` - Get user's favorites (protected)
- `POST /api/favorites/add/:productId` - Add to favorites (protected)
- `DELETE /api/favorites/remove/:productId` - Remove from favorites (protected)
- `GET /api/favorites/check/:productId` - Check if product is favorite (protected)

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations (protected)

## How to Use

### 1. Register/Login
- Click "Register" to create a new account
- Or click "Login" if you already have an account
- Login details are stored securely in MongoDB

### 2. Browse Products
- View all products on the Products page
- Filter by category
- Click on any product to see detailed information
- All prices are in Indian Rupees (₹)

### 3. Rate Products
- On product details page, rate the product 1-5 stars
- Optionally add a review (max 500 characters)
- Update your rating anytime

### 4. Save Favorites
- Click the heart icon to add/remove from favorites
- View all favorites on the Favorites page
- Quickly access your favorite products

### 5. Get Recommendations
- Recommendations are generated based on:
  - Products you've rated highly (4-5 stars)
  - Categories you prefer
  - Similar products to your favorites
- See personalized recommendations on Recommendations page

## Sample Products

The database includes 12 sample products with real images:

- **Electronics**: iPhone 15 Pro, Samsung Galaxy S24, MacBook Pro M3, Sony Headphones, Dell XPS, Kindle, Apple Watch
- **Clothing & Accessories**: Nike Air Jordan, Adidas Ultraboost, Gucci Leather Jacket, Ray-Ban Sunglasses
- **Fitness**: Yoga Mat Premium

All prices are in Indian Rupees (₹) suitable for Indian market.

## Recommendation Algorithm

The recommendation engine:
1. Analyzes user's rating history
2. Identifies preferred product categories
3. Finds highly-rated products in those categories
4. Excludes already-rated or favorited products
5. Returns top 10 personalized recommendations

## Authentication

- **JWT-based authentication**
- Tokens stored in localStorage on client
- Passwords hashed with bcryptjs (10 salt rounds)
- Protected routes require valid token
- Token expires in 7 days

## Responsive Design

- Mobile-first approach
- Adapts to all screen sizes (480px, 768px, 1200px+)
- Touch-friendly buttons and interactions
- Optimized images for faster loading

## Features Built

✅ Frontend with React and React Router
✅ Component-based architecture
✅ API integration with backend
✅ MongoDB database connection
✅ User authentication system
✅ Product browsing and filtering
✅ Rating system (1-5 stars)
✅ Favorites/Wishlist management
✅ AI recommendation engine
✅ Responsive UI design
✅ Attractive styling with gradients
✅ Prices in Indian Rupees (₹)
✅ Sample product data
✅ Error handling
✅ Loading states

## Running the Full Application

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

Then open browser to `http://localhost:3000`

## Test Credentials

After running the seed script, you can:
1. Register a new account
2. Login with your credentials
3. Browse and interact with sample products

## Future Enhancements

- Shopping cart functionality
- Checkout and payment integration
- Order history
- Product search
- Advanced filtering
- User profile management
- Admin panel for product management
- Social sharing
- Email notifications
- Real-time chat support

## Troubleshooting

**MongoDB Connection Error:**
- Verify connection string in .env
- Check MongoDB Atlas IP whitelist
- Ensure credentials are correct

**API Not Responding:**
- Check if backend server is running on port 5000
- Verify CORS is enabled
- Check browser console for errors

**Products Not Loading:**
- Run `node seed.js` to populate database
- Check MongoDB connection
- Verify API endpoints are correct

## Author
Created as Web Technology Project

## License
ISC
