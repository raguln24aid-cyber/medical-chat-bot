import React, { useState, useEffect } from 'react';

function RatingComponent({ productId, userRating, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userRating) {
      setRating(userRating.rating);
      setReview(userRating.review || '');
    }
  }, [userRating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(rating, review);
    setMessage('Rating saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="card">
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Your Rating</label>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map(i => (
              <span
                key={i}
                className={`star ${i <= (hoveredRating || rating) ? 'active' : ''}`}
                onMouseEnter={() => setHoveredRating(i)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(i)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Your Review (Optional)</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="form-textarea"
            placeholder="Share your thoughts about this product..."
            maxLength={500}
          />
          <small style={{ color: '#999' }}>{review.length}/500</small>
        </div>

        <button type="submit" className="btn btn-primary">
          {userRating ? 'Update Rating' : 'Submit Rating'}
        </button>
      </form>
    </div>
  );
}

export default RatingComponent;
