// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Placeholder route imports (will be created later)
// const authRoutes = require('./src/routes/auth');
// const recruiterRoutes = require('./src/routes/recruiter');
// const collegeRoutes = require('./src/routes/college');
// const jobsRoutes = require('./src/routes/jobs');
// app.use('/api/auth', authRoutes);
// app.use('/api/recruiter', recruiterRoutes);
// app.use('/api/college', collegeRoutes);
// app.use('/api/jobs', jobsRoutes);

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuspilot';

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
