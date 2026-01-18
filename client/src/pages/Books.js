import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Books({ onLogout }) {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get search term from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const searchFromUrl = urlParams.get('search') || '';
    setSearchTerm(searchFromUrl);
  }, [location.search]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const url = searchTerm 
          ? `/api/books?search=${encodeURIComponent(searchTerm)}`
          : '/api/books';
        
        const response = await fetch(url);
        const data = await response.json();
        setFilteredBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    // Update URL without page reload
    const newUrl = newSearchTerm 
      ? `/books?search=${encodeURIComponent(newSearchTerm)}`
      : '/books';
    window.history.replaceState({}, '', newUrl);
  };

  const clearSearch = () => {
    setSearchTerm('');
    window.history.replaceState({}, '', '/books');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Book Platform</h1>
          <div>
            <button onClick={() => navigate('/orders')} style={{ marginRight: '10px' }}>My Orders</button>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="top-search-section">
          <div className="search-container-top">
            <div className="search-box-top">
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input-top"
              />
              {searchTerm && (
                <button className="clear-search-top" onClick={clearSearch}>×</button>
              )}
            </div>
            {searchTerm && (
              <div className="search-results-top">
                <p>{filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found for "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        <div className="books-header-simple">
          <button className="back-btn" onClick={() => navigate('/home')}>← Back to Home</button>
          <h2>All Books</h2>
        </div>

        {loading ? (
          <div className="loading">Loading books...</div>
        ) : (
          <>
            {filteredBooks.length === 0 && searchTerm ? (
              <div className="no-results">
                <p>No books found matching "{searchTerm}"</p>
                <button className="btn" onClick={clearSearch}>Show All Books</button>
              </div>
            ) : (
              <div className="books-grid">
                {filteredBooks.map(book => (
                  <div key={book._id} className="book-card">
                    <img src={book.image} alt={book.title} />
                    <div className="book-card-content">
                      <h3>{book.title}</h3>
                      <p>by {book.author}</p>
                      <p className="price">${book.price}</p>
                      <button className="btn" onClick={() => navigate(`/books/${book._id}`)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Books;
