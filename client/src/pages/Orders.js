import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
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
        <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>My Orders</h2>
        {orders.length === 0 ? (
          <div className="empty-orders">
            <p>You haven't placed any orders yet.</p>
            <button className="btn" onClick={() => navigate('/books')}>Browse Books</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order._id.slice(-6)}</span>
                  <span className={`order-status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-content">
                  <img src={order.book.image} alt={order.book.title} />
                  <div className="order-details">
                    <h3>{order.book.title}</h3>
                    <p>by {order.book.author}</p>
                    <p className="order-price">${order.book.price}</p>
                    <p className="payment-method">
                      Payment: {order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '📱 UPI'}
                    </p>
                    <p className="order-date">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
