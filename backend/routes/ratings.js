const express = require('express');
const Rating = require('../models/Rating');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get ratings for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const ratings = await Rating.find({ productId: req.params.productId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update rating
router.post('/', auth, async (req, res) => {
  try {
    const { productId, rating, review } = req.body;

    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid rating data' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if rating already exists
    let existingRating = await Rating.findOne({ userId: req.userId, productId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.review = review || '';
      await existingRating.save();
    } else {
      // Create new rating
      const newRating = new Rating({
        userId: req.userId,
        productId,
        rating,
        review: review || ''
      });
      await newRating.save();
      existingRating = newRating;
    }

    // Update product's average rating
    const allRatings = await Rating.find({ productId });
    const averageRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;
    product.averageRating = parseFloat(averageRating.toFixed(1));
    product.ratingCount = allRatings.length;
    await product.save();

    res.json({
      message: 'Rating saved successfully',
      rating: existingRating
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's rating for a product
router.get('/:productId', auth, async (req, res) => {
  try {
    const rating = await Rating.findOne({
      userId: req.userId,
      productId: req.params.productId
    });
    res.json(rating || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
