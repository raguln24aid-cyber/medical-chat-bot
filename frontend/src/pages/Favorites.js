import React, { useState, useEffect } from 'react';
import { favoriteService } from '../services/api';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await favoriteService.getAll();
      setFavorites(response.data);
    } catch (err) {
      setError('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await favoriteService.remove(productId);
      setFavorites(favorites.filter(fav => fav.productId._id !== productId));
    } catch (err) {
      alert('Error removing favorite');
    }
  };

  if (loading) return <div className="loading">Loading favorites...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>My Favorite Products</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Browse our products and add your favorites to see them here</p>
        </div>
      ) : (
        <div className="products-grid">
          {favorites.map(fav => (
            <ProductCard
              key={fav.productId._id}
              product={fav.productId}
              isFavorite={true}
              onToggleFavorite={() => handleRemoveFavorite(fav.productId._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
