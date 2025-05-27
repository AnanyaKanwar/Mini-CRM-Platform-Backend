const express = require('express');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { customerId, amount, date } = req.body;
    const order = await Order.create({ customer: customerId, amount, date });
    // Update customer's spend/visits/lastVisit
    await Customer.findByIdAndUpdate(customerId, {
      $inc: { totalSpend: amount, visits: 1 },
      lastVisit: date
    });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
