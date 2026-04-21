#!/bin/bash

# Quick Installation Script for Linux/Mac

echo ""
echo "============================================"
echo "E-Commerce Recommendation System Setup"
echo "============================================"
echo ""

echo "[1/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi
echo "Backend dependencies installed successfully!"
echo ""

echo "[2/4] Seeding sample products to MongoDB..."
node seed.js
if [ $? -ne 0 ]; then
    echo "Warning: Seed script failed. Check MongoDB connection."
    echo "You can run 'node seed.js' manually later."
else
    echo "Sample products seeded successfully!"
fi
echo ""

echo "[3/4] Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi
echo "Frontend dependencies installed successfully!"
echo ""

cd ..
echo "============================================"
echo "Installation Complete!"
echo "============================================"
echo ""
echo "Next Steps:"
echo ""
echo "1. Open Terminal #1 and run:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. Open Terminal #2 and run:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Browser will open at: http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
echo ""
