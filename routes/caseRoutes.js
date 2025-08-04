const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { uploadCase, searchCases, getAllCases } = require('../controllers/caseController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadCase);

// ✅ GET all cases
router.get('/', getAllCases);

// 🔍 Search cases
router.get('/search', searchCases);

module.exports = router;