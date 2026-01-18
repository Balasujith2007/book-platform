import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/books');
    }
  };

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
          
          <form onSubmit={handleSearch} className="home-search">
            <div className="home-search-box">
              <input
                type="text"
                placeholder="Search for books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="home-search-input"
              />
              <button type="submit" className="home-search-btn">Search</button>
            </div>
          </form>
          
          <button className="btn" onClick={() => navigate('/books')}>
            Browse All Books
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
