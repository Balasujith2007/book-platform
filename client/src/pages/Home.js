import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1>Book Platform</h1>
          <div>
            <button onClick={() => navigate('/orders')} style={{ marginRight: '10px' }}>My Orders</button>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="home-hero">
          <h1>Welcome to Book Platform</h1>
          <p>Discover amazing books and expand your knowledge</p>
          <button className="btn" onClick={() => navigate('/books')}>
            Browse Books
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
