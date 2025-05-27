const express = require('express');
const CommunicationLog = require('../models/CommunicationLog');
const router = express.Router();

router.post('/', async (req, res) => {
  const { logId, status } = req.body;
  await CommunicationLog.findByIdAndUpdate(logId, { status });
  res.json({ success: true });
});

module.exports = router;
