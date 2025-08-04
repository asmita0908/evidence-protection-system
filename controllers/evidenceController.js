const Evidence = require('../models/Evidence');

// Add new evidence
exports.addEvidence = async (req, res) => {
  try {
    const { data, addedBy } = req.body;
    const newEvidence = new Evidence({ data, addedBy });
    await newEvidence.save();
    res.status(201).json({ message: 'Evidence saved', id: newEvidence._id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding evidence', error: error.message });
  }
};

// Get all evidence
exports.getEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.find();
    res.status(200).json(evidence);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching evidence', error: error.message });
  }
};