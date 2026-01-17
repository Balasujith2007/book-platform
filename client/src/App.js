import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Orders from './pages/Orders';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!token ? <Signup setToken={setToken} /> : <Navigate to="/home" />} />
        <Route path="/home" element={token ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/books" element={token ? <Books onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/books/:id" element={token ? <BookDetails onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
