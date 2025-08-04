const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  twoFactorSecret: String,  // ✅ Ye line zarur honi chahiye
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);