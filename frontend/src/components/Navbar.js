import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🛍️ ShopSmart
      </Link>
      <ul className="navbar-nav">
        <li><Link to="/products">Products</Link></li>
        {isAuthenticated && <li><Link to="/recommendations">Recommendations</Link></li>}
        {isAuthenticated && <li><Link to="/favorites">Favorites</Link></li>}
      </ul>
      <div className="navbar-user">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.name}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
              Login
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
