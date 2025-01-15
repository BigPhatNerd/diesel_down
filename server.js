require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs'); // Required for reading index.html
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const blog = require('./routes/api/blog');
const jotFormWebhook = require('./routes/webhooks/jotform');

const cors = require('cors');
const app = express();
connectDB();

// Force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// API routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/webhooks', jotFormWebhook);
app.use('/api/blog', blog);

// Serve privacy policy
app.get('/privacy-policy', (req, res) => {
  const filePath = path.join(__dirname, 'privacy-policy.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending privacy-policy.html:', err.message);
      res.status(500).send('Privacy Policy file not found.');
    }
  });
});

// Production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Catch-all route for React frontend
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 4390;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
