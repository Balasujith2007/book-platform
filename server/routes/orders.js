const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { bookId, paymentMethod } = req.body;
    
    if (!paymentMethod || !['cod', 'upi'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Valid payment method required (cod or upi)' });
    }
    
    const order = new Order({
      user: req.userId,
      book: bookId,
      paymentMethod,
      status: 'pending'
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('book')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
