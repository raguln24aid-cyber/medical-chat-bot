const express = require('express');
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's favorites
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId })
      .populate('productId')
      .sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to favorites
router.post('/add/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const existingFavorite = await Favorite.findOne({
      userId: req.userId,
      productId
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    const favorite = new Favorite({
      userId: req.userId,
      productId
    });

    await favorite.save();
    res.status(201).json({
      message: 'Added to favorites',
      favorite
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from favorites
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await Favorite.deleteOne({
      userId: req.userId,
      productId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check if product is favorite
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      userId: req.userId,
      productId: req.params.productId
    });
    res.json({ isFavorite: !!favorite });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
