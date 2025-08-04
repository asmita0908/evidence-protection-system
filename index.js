const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import routes
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const caseRoutes = require('./routes/caseRoutes'); // ✅ ADD THIS

// ✅ Use routes
app.use('/api/users', userRoutes);
app.use('/api/evidence', uploadRoutes);
app.use('/api/cases', caseRoutes); // ✅ ADD THIS

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});