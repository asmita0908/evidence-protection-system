const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Evidence', evidenceSchema);