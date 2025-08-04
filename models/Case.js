const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  criminalName: {
    type: String,
    required: true
  },
  caseNumber: String,
  date: String,
  time: String,
  type: String,
  description: String,
  place: String,
  file: String // uploaded file name
});

module.exports = mongoose.model('Case', caseSchema);