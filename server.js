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

  let cachedIndexHTML;

  // Handle dynamic blog meta tags
  app.get('/blog/:slug', async (req, res) => {
    const slug = req.params.slug;
    console.log('Requested slug:', slug);

    try {
      // Fetch the blog post from the API
      const response = await fetch(`https://dieseldown.com/api/blog/${slug}`);
      if (!response.ok) {
        console.error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
        throw new Error('Failed to fetch blog data');
      }
      console.log({ response })
      const blog = await response.json();
      console.log({ blog })
      // Cache index.html to reduce file system operations
      if (!cachedIndexHTML) {
        cachedIndexHTML = fs.readFileSync(path.resolve(__dirname, 'client', 'build', 'index.html'), 'utf8');
      }

      // Replace meta tags with dynamic data
      const updatedHTML = cachedIndexHTML
        .replace('<meta property="og:title" content="Diesel Down - Performance Diesel Data and Analytics" />', `<meta property="og:title" content="${blog.title}" />`)
      // .replace('<meta property="og:description" content="Explore Diesel Down\'s professional diesel tuning services with our state-of-the-art Dynocom 15,000 Series Dyno!" />', `<meta property="og:description" content="${blog.excerpt}" />`)
      // .replace('<meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg" />', `<meta property="og:image" content="${blog.image}" />`)
      // .replace('<meta property="og:url" content="https://dieseldown.com" />', `<meta property="og:url" content="https://dieseldown.com/blog/${slug}" />`);

      res.send(updatedHTML);
    } catch (error) {
      console.error('Error handling /blog/:slug:', error.message);
      res.status(500).send('An error occurred while loading the blog.');
    }
  });

  // Catch-all route for React frontend
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 4390;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
