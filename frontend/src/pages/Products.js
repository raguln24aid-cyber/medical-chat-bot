import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, favoriteService } from '../services/api';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    fetchProducts();
    loadFavorites();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await favoriteService.getAll();
      const favoriteIds = {};
      response.data.forEach(fav => {
        favoriteIds[fav.productId._id] = true;
      });
      setFavorites(favoriteIds);
    } catch (err) {
      // No favorites or not authenticated
    }
  };

  const handleToggleFavorite = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add favorites');
      return;
    }

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

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Our Products</h1>

      <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className="btn btn-secondary"
              style={{
                backgroundColor: selectedCategory === cat ? '#667eea' : '#f3f4f6',
                color: selectedCategory === cat ? 'white' : '#333'
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try selecting a different category</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              isFavorite={favorites[product._id]}
              onToggleFavorite={() => handleToggleFavorite(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
