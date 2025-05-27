const express = require('express');
const CommunicationLog = require('../models/CommunicationLog');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:campaignId', auth, async (req, res) => {
  const logs = await CommunicationLog.find({ campaign: req.params.campaignId })
    .populate('customer', 'name email');
  res.json(logs);
});

module.exports = router;
