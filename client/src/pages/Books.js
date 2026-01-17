import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Books({ onLogout }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error fetching books:', err));
  }, []);

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
        <button className="back-btn" onClick={() => navigate('/home')}>← Back to Home</button>
        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>All Books</h2>
        <div className="books-grid">
          {books.map(book => (
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
      </div>
    </div>
  );
}

export default Books;
