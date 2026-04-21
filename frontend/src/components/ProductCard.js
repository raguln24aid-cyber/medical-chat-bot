import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
        <div className="product-category">{product.category}</div>

        {product.ratingCount > 0 && (
          <div className="product-rating">
            ⭐ {product.averageRating.toFixed(1)} ({product.ratingCount} ratings)
          </div>
        )}

        <div className="product-actions">
          <Link to={`/products/${product._id}`} className="btn btn-primary">
            View Details
          </Link>
          <button
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
