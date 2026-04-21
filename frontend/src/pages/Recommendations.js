import React, { useState, useEffect } from 'react';
import { recommendationService, favoriteService } from '../services/api';
import ProductCard from '../components/ProductCard';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    loadRecommendations();
    loadFavorites();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await recommendationService.getRecommendations();
      setRecommendations(response.data.recommendations);
      setPreferences(response.data.preferences);
    } catch (err) {
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await favoriteService.getAll();
      const favoriteIds = {};
      response.data.forEach(fav => {
        favoriteIds[fav.productId._id] = true;
      });
      setFavorites(favoriteIds);
    } catch (err) {
      // No favorites
    }
  };

  const handleToggleFavorite = async (productId) => {
    try {
      if (favorites[productId]) {
        await favoriteService.remove(productId);
        setFavorites({ ...favorites, [productId]: false });
      } else {
        await favoriteService.add(productId);
        setFavorites({ ...favorites, [productId]: true });
      }
    } catch (err) {
      alert('Error updating favorite');
    }
  };

  if (loading) return <div className="loading">Loading recommendations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Personalized Recommendations</h1>

      {Object.keys(preferences).length > 0 && (
        <div className="card" style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff' }}>
          <h3>Your Preferences</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {Object.entries(preferences).map(([category, count]) => (
              <div key={category} className="product-category">
                {category} ({count})
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Based on your ratings and favorite items, we've selected these products just for you!
          </p>
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="empty-state">
          <h2>No recommendations yet</h2>
          <p>Rate some products and mark favorites to get personalized recommendations</p>
        </div>
      ) : (
        <div>
          <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
            {recommendations.length} Recommended for You
          </h2>
          <div className="products-grid">
            {recommendations.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                isFavorite={favorites[product._id]}
                onToggleFavorite={() => handleToggleFavorite(product._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
