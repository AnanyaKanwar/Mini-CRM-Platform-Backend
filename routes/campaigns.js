const express = require('express');
const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');
const auth = require('../middleware/auth');
const router = express.Router();
const axios = require('axios');

// Rule-based filtering (simplified example)
function filterCustomers(rules, customers) {
  return customers.filter(customer => {
    return rules.every(rule => {
      switch (rule.operator) {
        case '>': return customer[rule.field] > rule.value;     
        case '<': return customer[rule.field] < rule.value;
        case '==': return customer[rule.field] === rule.value;
        default: return false;
      }
    });
  });
}

router.post('/', auth, async (req, res) => {
  try {
    const { name, rules, message } = req.body;
    const customers = await Customer.find();
    const audience = filterCustomers(rules, customers);
    const campaign = await Campaign.create({
      name,
      rules,
      audience: audience.map(c => c._id),
      stats: { audienceSize: audience.length }
    });

    // Simulate delivery (async, no await to avoid blocking response)
    simulateDelivery(audience.map(c => c._id), campaign._id, message);
    
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

async function simulateDelivery(audience, campaignId, message) {
  const promises = audience.map(async (customerId) => {
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    const log = await CommunicationLog.create({ 
      campaign: campaignId, 
      customer: customerId, 
      status, 
      message 
    });
    // Simulate vendor API callback (mock with 1s delay)
    setTimeout(async () => {
      await axios.post('http://localhost:5000/api/delivery-receipt', { 
        logId: log._id, 
        status 
      });
    }, 1000);
  });
  await Promise.all(promises);
}

router.get('/', auth, async (req, res) => {
  const campaigns = await Campaign.find()
    .sort({ createdAt: -1 })
    .populate('audience', 'name email');
  res.json(campaigns);
});

module.exports = router;
