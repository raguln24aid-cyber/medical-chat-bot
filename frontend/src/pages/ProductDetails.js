import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, ratingService, favoriteService } from '../services/api';
import RatingComponent from '../components/RatingComponent';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchProductDetails();
    checkFavoriteStatus();
    loadUserRating();
    loadRatings();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await favoriteService.check(id);
      setIsFavorite(response.data.isFavorite);
    } catch (err) {
      // Not authenticated or error
    }
  };

  const loadUserRating = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await ratingService.getUserRating(id);
      if (response.data._id) {
        setUserRating(response.data);
      }
    } catch (err) {
      // No rating yet
    }
  };

  const loadRatings = async () => {
    try {
      const response = await ratingService.getProductRatings(id);
      setRatings(response.data);
    } catch (err) {
      // Error loading ratings
    }
  };

  const handleRatingSubmit = async (rating, review) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to rate products');
      return;
    }

    try {
      await ratingService.addRating(id, rating, review);
      loadUserRating();
      loadRatings();
      fetchProductDetails();
    } catch (err) {
      alert('Failed to save rating');
    }
  };

  const handleToggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.remove(id);
      } else {
        await favoriteService.add(id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      alert('Error updating favorite');
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div>
      <button onClick={() => navigate('/products')} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
        ← Back to Products
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
        </div>

        <div>
          <h1>{product.name}</h1>
          <div style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold', margin: '1rem 0' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <div className="product-category">{product.category}</div>

          <p style={{ margin: '1rem 0', lineHeight: '1.6', color: '#666' }}>
            {product.description}
          </p>

          <div style={{ margin: '1.5rem 0' }}>
            <p><strong>Stock Available:</strong> {product.stock > 0 ? product.stock : 'Out of stock'}</p>
            {product.ratingCount > 0 && (
              <p><strong>Rating:</strong> ⭐ {product.averageRating.toFixed(1)} / 5 ({product.ratingCount} ratings)</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-primary">
              Add to Cart
            </button>
            <button
              className={`btn-favorite ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              style={{ fontSize: '1.5rem', padding: '0.6rem 1rem' }}
            >
              {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Rate This Product</h2>
        <RatingComponent productId={id} userRating={userRating} onSubmit={handleRatingSubmit} />
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Customer Reviews ({ratings.length})</h2>
        {ratings.length === 0 ? (
          <p style={{ color: '#999' }}>No reviews yet. Be the first to review!</p>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
            {ratings.map(rating => (
              <div key={rating._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>{rating.userId.name}</strong>
                  <span style={{ color: '#f59e0b' }}>
                    {'⭐'.repeat(rating.rating)}
                  </span>
                </div>
                {rating.review && <p style={{ color: '#666', marginTop: '0.5rem' }}>{rating.review}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
