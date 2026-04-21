# 🔧 Configuration & Architecture Guide

## Overview

This document explains the architecture, configuration, and how all components work together.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                           │
│  (port 3000) - User Interface & Interactions               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/AJAX Requests (Axios)
                       │ JSON Data Exchange
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js Backend                          │
│  (port 5000) - API Endpoints & Business Logic              │
│                                                              │
│  Routes:                                                    │
│  - Auth (register, login, get user)                        │
│  - Products (browse, filter, details)                      │
│  - Ratings (add/update ratings, get reviews)               │
│  - Favorites (add, remove, check)                          │
│  - Recommendations (AI algorithm)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ Mongoose ODM
                       │ Database Queries
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Atlas                             │
│  Cloud Database - Data Storage & Retrieval                 │
│                                                              │
│  Collections:                                              │
│  - users → Auth & user profiles                            │
│  - products → Product catalog                              │
│  - ratings → User ratings & reviews                        │
│  - favorites → User favorite items                         │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Structure

### Pages (src/pages/)

**Home.js**
- Landing page with project overview
- How the system works section
- Feature highlights
- Hero image from Unsplash
- Calls-to-action

**Login.js**
- Email/password form
- JWT token storage
- Error handling
- Redirects to home on success
- Link to register page

**Register.js**
- Name, email, password fields
- Password confirmation
- User creation via API
- Automatic login after signup
- Link to login page

**Products.js**
- Fetch all products from `/api/products`
- Category filtering
- ProductCard components
- Favorite toggle
- Load favorites status
- Interactive category buttons

**ProductDetails.js**
- Full product view
- Image, description, price
- Average rating display
- User rating component
- Customer reviews section
- Add to/from favorites
- Back button navigation

**Favorites.js**
- Fetch user's favorite products
- ProductCard display
- Remove favorites functionality
- Empty state message
- Load favorites on mount

**Recommendations.js**
- Call `/api/recommendations`
- Display algorithm results
- Show user preferences
- Category breakdown
- Personalized products grid
- Empty state for new users

### Components (src/components/)

**Navbar.js**
- Responsive navigation bar
- Conditional rendering (logged in/out)
- User greeting with name
- Navigation links based on auth
- Logout button
- Mobile-responsive

**ProductCard.js**
- Reusable product display
- Image, name, price display
- Category badge
- Average rating
- Favorite heart button
- View details link

**RatingComponent.js**
- 5-star rating interface
- Review text area (max 500 chars)
- Submit/update button
- Conditional rendering for new vs update
- Hover effects on stars
- Character count display

### Services (src/services/)

**api.js**
- Axios instance with base URL
- Request interceptor (adds token)
- Exported service objects:
  - `authService` - register, login, getCurrentUser
  - `productService` - getAll, getById, getByCategory
  - `ratingService` - addRating, getProductRatings, getUserRating
  - `favoriteService` - getAll, add, remove, check
  - `recommendationService` - getRecommendations

### Styling (App.css)

**Responsive Breakpoints**
- 1200px+ : Desktop
- 768px - 1199px : Tablet
- 480px - 767px : Small mobile
- < 480px : Extra small mobile

**Color Palette**
- Primary Gradient: #667eea (purple) to #764ba2 (dark purple)
- Secondary: #f3f4f6 (light gray)
- Accents: #ef4444 (red for favorites), #f59e0b (gold for ratings)
- Background: #f5f5f5 (light gray)

**Component Classes**
- `.navbar` - Top navigation
- `.card` - Info boxes
- `.products-grid` - Responsive product layout
- `.product-card` - Individual product
- `.btn` - Button styles
- `.form-container` - Form wrapping

## Backend Structure

### Models (models/)

**User.js**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  preferences: [String] (categories liked),
  createdAt: Date
}
```
- Pre-save hook hashes password
- comparePassword method for auth

**Product.js**
```javascript
{
  name: String,
  description: String,
  price: Number (in rupees),
  image: String (URL),
  category: String,
  stock: Number,
  averageRating: Number (0-5),
  ratingCount: Number,
  createdAt: Date
}
```

**Rating.js**
```javascript
{
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: Product),
  rating: Number (1-5, required),
  review: String,
  createdAt: Date
}
```
- Unique index on (userId, productId)
- Prevents duplicate ratings

**Favorite.js**
```javascript
{
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: Product),
  createdAt: Date
}
```
- Unique index on (userId, productId)
- Prevents duplicate favorites

### Routes (routes/)

**auth.js**
- POST `/register` → Create account
- POST `/login` → Get JWT token
- GET `/me` → Get current user (protected)

**products.js**
- GET `/` → All products
- GET `/:id` → Single product
- GET `/category/:category` → By category
- POST `/` → Add product (protected)

**ratings.js**
- POST `/` → Add/update rating (protected)
- GET `/product/:productId` → All ratings for product
- GET `/:productId` → User's rating for product (protected)

**favorites.js**
- GET `/` → User's favorites (protected)
- POST `/add/:productId` → Add to favorites (protected)
- DELETE `/remove/:productId` → Remove from favorites (protected)
- GET `/check/:productId` → Check if favorite (protected)

**recommendations.js**
- GET `/` → Get recommendations (protected)
- Algorithm:
  1. Get user's rated and favorited products
  2. Extract categories from ratings
  3. Find highly-rated products (4+ stars)
  4. Find products in preferred categories
  5. Combine and deduplicate
  6. Return top 10

### Middleware (middleware/)

**auth.js**
- Extracts JWT from Authorization header
- Verifies token with JWT_SECRET
- Attaches userId to req object
- Returns 401 on invalid/missing token

### Server (server.js)

```javascript
- Express app setup
- CORS enabled
- JSON middleware
- MongoDB connection
- Route mounting
- Error handling
- Port 5000 listener
```

## Database Connection

**Connection String**
```
mongodb+srv://raguln:ragul@02@wtproject.is2ofgm.mongodb.net/?appName=wtproject
```

**Cloud Provider**: MongoDB Atlas
**Cluster**: wtproject
**Region**: India (optimized)

**Stored in**: `.env` file
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

## Data Flow Examples

### User Registration
1. User fills form on Register page
2. Frontend calls `authService.register(name, email, password)`
3. Axios sends POST to `/api/auth/register`
4. Backend receives, validates data
5. Checks if email exists
6. Creates User with hashed password
7. Returns JWT token
8. Frontend stores token in localStorage
9. User redirected to Home page

### Adding a Rating
1. User clicks stars on ProductDetails page
2. RatingComponent state updates
3. User clicks Submit Rating
4. Frontend calls `ratingService.addRating(productId, rating, review)`
5. Axios sends POST to `/api/ratings` with JWT
6. Backend auth middleware verifies token
7. Creates/updates Rating document
8. Updates Product's averageRating and ratingCount
9. Returns updated rating
10. Frontend refreshes rating display

### Getting Recommendations
1. User clicks "Recommendations" in navbar
2. Frontend calls `recommendationService.getRecommendations()`
3. Backend gets user's ratings and favorites
4. Extracts preferred categories
5. Finds high-rated products (4+ stars)
6. Finds products in preferred categories
7. Deduplicates and limits to 10
8. Returns data as JSON
9. Frontend displays ProductCards

## Environment Variables

### Backend .env
```
MONGODB_URI=mongodb+srv://...  # MongoDB connection
JWT_SECRET=secret123           # Token signing key
PORT=5000                      # Server port
NODE_ENV=development           # Environment
```

### Frontend Configuration
API_BASE_URL set in `src/services/api.js`
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Authentication Flow

```
1. User registers or logs in
   ↓
2. Backend creates JWT token containing userId
   ↓
3. Token sent to frontend
   ↓
4. Frontend stores in localStorage
   ↓
5. For protected routes, frontend sends token in Authorization header
   ↓
6. Backend middleware verifies token
   ↓
7. If valid, request continues. If not, returns 401
```

Token Structure:
```
Header.Payload.Signature

Header: {typ: "JWT", alg: "HS256"}
Payload: {userId: "...", iat: ..., exp: ...}
Signature: HMAC-SHA256(header.payload, JWT_SECRET)
```

## API Response Format

**Success (200)**
```json
{
  "message": "Success message",
  "data": { /* requested data */ },
  "user": { /* user info */ },
  "token": "jwt_token_here"
}
```

**Error (4xx, 5xx)**
```json
{
  "message": "Error description"
}
```

## Port Management

- **Frontend**: 3000 (React development server)
- **Backend**: 5000 (Express API)
- **Database**: Cloud (MongoDB Atlas)

If ports are in use:
- Frontend will ask to use 3001
- Backend: change PORT in .env

## Security Considerations

✅ **Implemented**
- Password hashing (bcryptjs, 10 rounds)
- JWT tokens with expiration (7 days)
- Protected routes (require auth)
- Input validation
- CORS enabled
- No passwords in logs/responses

⚠️ **For Production**
- Use HTTPS only
- Set secure JWT_SECRET
- Add rate limiting
- Add request validation
- Use environment-specific configs
- Add logging/monitoring
- Use database backups

## Performance Optimizations

- Components only re-render on state change
- API calls only on mount/dependency change
- Images from CDN (Unsplash)
- CSS optimized for rendering
- Minimal dependencies
- Efficient database queries
- Indexed unique fields

## File Size & Performance

**Frontend Bundle**: ~150KB (gzipped)
**Backend**: ~1.5MB (node_modules)
**Database**: MongoDB Atlas (scalable)

## Scalability

To scale:
1. Add caching layer (Redis)
2. Implement pagination for products
3. Add search index on product names
4. Use CDN for images
5. Implement API rate limiting
6. Add server clustering
7. Database sharding

## Maintenance

**Regular Tasks**
- Monitor MongoDB usage
- Check JWT token usage
- Review error logs
- Update npm packages
- Backup database
- Clean old sessions

---

This architecture is designed to be:
- **Scalable** - Can handle more users/data
- **Maintainable** - Clear separation of concerns
- **Secure** - Tokens and password hashing
- **Performant** - Optimized queries and rendering
- **Extensible** - Easy to add features
