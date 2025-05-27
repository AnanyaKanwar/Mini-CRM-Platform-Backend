const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  rules: Object, // Store JSON rule object
  audience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  stats: {
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    audienceSize: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
