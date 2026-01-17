import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookDetails({ onLogout }) {
  const [book, setBook] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error('Error fetching book:', err));
  }, [id]);

  const handleBuyClick = () => {
    setShowPaymentModal(true);
  };

  const handleConfirmOrder = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: id, paymentMethod: selectedPayment })
      });

      if (response.ok) {
        setShowPaymentModal(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/orders');
        }, 2000);
      }
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  if (!book) return <div>Loading...</div>;

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
        <button className="back-btn" onClick={() => navigate('/books')}>← Back to Books</button>
        {showSuccess && (
          <div className="success-message">Order placed successfully! Redirecting to orders...</div>
        )}
        <div className="book-details">
          <div className="book-details-content">
            <div>
              <img src={book.image} alt={book.title} />
            </div>
            <div className="book-info">
              <h1>{book.title}</h1>
              <p className="author">by {book.author}</p>
              <p className="description">{book.description}</p>
              <p className="price">${book.price}</p>
              <button className="btn" onClick={handleBuyClick}>Buy Now</button>
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Select Payment Method</h2>
              <div className="payment-options">
                <div 
                  className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('cod')}
                >
                  <div className="payment-icon">💵</div>
                  <div className="payment-info">
                    <h3>Cash on Delivery</h3>
                    <p>Pay when you receive the book</p>
                  </div>
                  {selectedPayment === 'cod' && <span className="checkmark">✓</span>}
                </div>
                <div 
                  className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="payment-icon">📱</div>
                  <div className="payment-info">
                    <h3>UPI Payment</h3>
                    <p>Pay instantly via UPI</p>
                  </div>
                  {selectedPayment === 'upi' && <span className="checkmark">✓</span>}
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                <button className="btn" onClick={handleConfirmOrder}>Confirm Order</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
