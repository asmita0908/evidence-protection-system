// File: index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ CORS import kiya

// Import all routes (authRoutes mein login hona chahiye)
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes'); // ✅ Agar koi userRoutes hai toh

dotenv.config();

const app = express();

// ✅ CORS Middleware: Ye sabse zaruri hai taki GitHub Pages se call aa sake
app.use(cors({
    origin: '*', // Ya aap yahan 'https://asmita0908.github.io' daal sakte hain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
// ✅ Hum '/api/auth' route use kar rahe hain, jismein login hoga
app.use('/api/auth', authRoutes); 

// Agar aapke paas userRoutes file mein kuch aur hai toh ye bhi use karo:
app.use('/api/users', userRoutes); 

// Basic health check route
app.get('/', (req, res) => {
    res.send('Evidence Manager API is running!');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));