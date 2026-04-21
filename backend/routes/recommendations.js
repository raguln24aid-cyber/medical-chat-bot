const express = require('express');
const Favorite = require('../models/Favorite');
const Rating = require('../models/Rating');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get recommendations for user
router.get('/', auth, async (req, res) => {
  try {
    // Get user's favorites and ratings
    const userFavorites = await Favorite.find({ userId: req.userId }).select('productId');
    const userRatings = await Rating.find({ userId: req.userId }).select('productId rating');

    const favoriteProductIds = userFavorites.map(f => f.productId.toString());
    const ratedProductIds = userRatings.map(r => r.productId.toString());

    // Get categories from user's rated products
    const ratedProducts = await Product.find({ _id: { $in: userRatings.map(r => r.productId) } });
    const userCategoryPreferences = {};

    ratedProducts.forEach(product => {
      userCategoryPreferences[product.category] = (userCategoryPreferences[product.category] || 0) + 1;
    });

    // Get high-rated products (4+ stars)
    const highRatedProducts = await Product.find({
      averageRating: { $gte: 4 },
      _id: { $nin: [...favoriteProductIds, ...ratedProductIds] }
    }).limit(5);

    // Get products from similar categories
    const preferredCategories = Object.entries(userCategoryPreferences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    const categoryRecommendations = await Product.find({
      category: { $in: preferredCategories },
      _id: { $nin: [...favoriteProductIds, ...ratedProductIds] }
    }).limit(5);

    // Combine and deduplicate recommendations
    const recommendedIds = new Set();
    const recommendations = [];

    [...highRatedProducts, ...categoryRecommendations].forEach(product => {
      if (!recommendedIds.has(product._id.toString())) {
        recommendedIds.add(product._id.toString());
        recommendations.push(product);
      }
    });

    res.json({
      recommendations: recommendations.slice(0, 10),
      preferences: userCategoryPreferences,
      preferredCategories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
