const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // ✅ Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null,` ${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '❌ No file uploaded' });
  }
  res.status(200).json({
    message: '✅ File uploaded successfully',
    file: req.file
  });
});

module.exports = router;