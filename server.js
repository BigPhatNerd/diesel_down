require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs'); // Required for reading index.html
const axios = require('axios');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const blog = require('./routes/api/blog');
const jotFormWebhook = require('./routes/webhooks/jotform');
const puppeteer = require('puppeteer');

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

console.log("Before production")
// Production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  console.log("Here....")
  app.get('/blog/:slug', async (req, res) => {
    const slug = req.params.slug;
    console.log("\n\nReceived blog request:", { slug });

    try {
      // Launch Puppeteer
      console.log("\n\nLaunching Puppeteer...\n\n");
      const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',
        headless: 'new',  // Ensures compatibility
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--disable-accelerated-2d-canvas',
          '--disable-features=site-per-process',
          '--single-process',
          '--no-zygote'
        ],
      });



      console.log("\n\nPuppeteer launched successfully.\n\n");
      const page = await browser.newPage();

      // Navigate to the blog page
      const blogUrl = `https://dieseldown.com/blog/${slug}`;
      console.log("\n\nNavigating to:", blogUrl);
      await page.goto(blogUrl, { waitUntil: 'networkidle0' });

      console.log("\n\nSuccessfully loaded blog page:", blogUrl);

      // Fetch blog metadata
      console.log("\n\nFetching blog metadata from API...");
      const { data: blogData } = await axios.get(`https://api.dieseldown.com/api/blog/${slug}`);

      if (!blogData) {
        console.error("\n\nERROR: Blog data is undefined or null\n\n");
        throw new Error("Blog data is undefined or null");
      }

      console.log("\n\nSuccessfully fetched blog data:\n", blogData);

      // Inject meta tags dynamically
      console.log("\n\nInjecting Open Graph meta tags...\n\n");
      await page.evaluate((blog) => {
        // Remove existing Open Graph meta tags, including react-helmet tags
        document.querySelectorAll('meta[property^="og:"]').forEach((meta) => meta.remove());

        // Add new Open Graph meta tags
        const head = document.querySelector('head');

        const createMeta = (property, content) => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', property);
          meta.setAttribute('content', content);
          head.appendChild(meta);
        };

        createMeta('og:title', blog.Title);
        createMeta('og:description', blog.Content.substring(0, 150));
        createMeta('og:image', "https://dieseldown.com/profile_avatar.jpg");
        createMeta('og:url', `https://dieseldown.com/blog/${blog.slug}`);
        createMeta('og:type', 'article');
        createMeta('fb:app_id', '2028204197694958');
      }, blogData);

      console.log("\n\nMeta tags injected successfully.\n\n");

      // Get the updated HTML
      console.log("\n\nGenerating updated HTML...\n\n");
      const updatedHTML = await page.content();
      await browser.close();

      console.log("\n\nSending updated HTML response.\n\n");
      res.send(updatedHTML);

    } catch (error) {
      console.error('\n\nError rendering blog with Puppeteer:', error, "\n\n");

      // ✅ Ensure Facebook always receives a 200 response
      res.status(200).send('FB does not render meta tags dynamically. Blog can be found at https://dieseldown.com/blog');
    }
  });


  // Catch-all route for React frontend
  app.get('*', (req, res) => {
    console.log("\n\n\n\nIn the catch all route\n\n\n\n")
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 4390;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
