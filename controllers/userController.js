const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/user');

// ✅ SIGNUP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({ message: 'Signup successful', user: newUser });
};

// ✅ LOGIN + 2FA SETUP
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });

  const secret = speakeasy.generateSecret({ length: 20 });
  user.twoFactorSecret = secret.base32;
  await user.save();

  const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

  res.status(200).json({ message: 'Login successful', user, twoFactorQrCode: qrCodeUrl });
};

// ✅ 2FA VERIFY
exports.verify2FA = async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.twoFactorSecret) {
    return res.status(400).json({ message: '2FA not set up' });
  }

  const isVerified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token
  });

  if (isVerified) {
    res.status(200).json({ message: '✅ 2FA verification successful' });
  } else {
    res.status(401).json({ message: '❌ Invalid or expired 2FA token' });
  }
};

// ✅ RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: '✅ Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: '❌ Server error' });
  }
};