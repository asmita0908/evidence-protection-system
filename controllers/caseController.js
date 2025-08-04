const Case = require('../models/Case');

// ✅ Upload case
exports.uploadCase = async (req, res) => {
  try {
    const { caseNumber, date, time, type, place, description, criminalName } = req.body;
    const file = req.file ? req.file.filename : null;

    const newCase = new Case({
      caseNumber,
      date,
      time,
      type,
      place,
      description,
      criminalName,
      file
    });

    await newCase.save();
    res.status(200).json({ message: '✅ Case uploaded', case: newCase });
  } catch (err) {
    res.status(500).json({ message: '❌ Error uploading case', error: err.message });
  }
};

// ✅ Get all cases
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching cases', error: err.message });
  }
};

// ✅ Search by multiple fields (including criminal name)
exports.searchCases = async (req, res) => {
  try {
    const keyword = req.query.query;
    const results = await Case.find({
      $or: [
        { caseNumber: { $regex: keyword, $options: 'i' } },
        { type: { $regex: keyword, $options: 'i' } },
        { place: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { criminalName: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: '❌ Error searching cases', error: err.message });
  }
};