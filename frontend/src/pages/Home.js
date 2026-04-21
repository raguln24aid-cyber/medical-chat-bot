import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1460925895917-adf4e4be5dbd?w=300&h=300&fit=crop"
          alt="Shopping Banner"
          className="hero-image"
        />
        <h1>Smart E-Commerce Recommendations</h1>
        <p>Discover products tailored to your preferences and interests</p>
        <p>Shop smart, discover faster, rate and save your favorites!</p>
        <Link to="/products" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Start Shopping
        </Link>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
          <div>
            <h3>1. Browse & Explore</h3>
            <p>Browse our amazing collection of products across various categories.</p>
          </div>
          <div>
            <h3>2. Rate & Review</h3>
            <p>Rate products on a 1-5 star scale and share your thoughts with the community.</p>
          </div>
          <div>
            <h3>3. Save Favorites</h3>
            <p>Mark your favorite products for quick access and easy shopping.</p>
          </div>
          <div>
            <h3>4. Get Recommendations</h3>
            <p>Our smart algorithm suggests products based on your preferences and ratings.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem', backgroundColor: '#f0f9ff' }}>
        <h2>Why Choose Us?</h2>
        <ul style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          <li>✨ Personalized recommendations powered by AI</li>
          <li>💰 Prices displayed in Indian Rupees (₹)</li>
          <li>⭐ Community ratings to help you decide</li>
          <li>❤️ Save and manage your favorite products</li>
          <li>🚀 Fast and secure checkout</li>
          <li>📱 Fully responsive mobile-friendly design</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
