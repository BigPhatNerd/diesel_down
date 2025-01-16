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
    console.log({ slug })
    try {
      // Launch Puppeteer
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });

      console.log("\n\n\n\n\nfiring away\n\n\n")
      const page = await browser.newPage();

      // Navigate to the blog page
      const blogUrl = `https://dieseldown.com/blog/${slug}`;
      console.log({ blogUrl })
      await page.goto(blogUrl, { waitUntil: 'networkidle0' });

      // Inject meta tags dynamically
      const { data: blogData } = await axios.get(`https://api.dieseldown.com/api/blog/${slug}`);
      await page.evaluate((blog) => {
        // Remove existing Open Graph meta tags, including react-helmet tags
        document.querySelectorAll('meta[property^="og:"]').forEach((meta) => meta.remove());

        // Add new Open Graph meta tags
        const head = document.querySelector('head');

        const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.setAttribute('content', blog.Title);
        head.appendChild(ogTitle);

        const ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        ogDescription.setAttribute('content', blog.Content.substring(0, 150));
        head.appendChild(ogDescription);

        const ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        ogImage.setAttribute('content', "https://dieseldown.com/profile_avatar.jpg");
        head.appendChild(ogImage);

        const ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        ogUrl.setAttribute('content', `https://dieseldown.com/blog/${blog.slug}`);
        head.appendChild(ogUrl);

        const ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        ogType.setAttribute('content', 'article');
        head.appendChild(ogType);

        const fbAppId = document.createElement('meta');
        fbAppId.setAttribute('property', 'fb:app_id');
        fbAppId.setAttribute('content', '2028204197694958');
        head.appendChild(fbAppId);
      }, blogData);



      // Get the updated HTML
      const updatedHTML = await page.content();
      await browser.close();

      // Send the rendered HTML to the client
      res.send(updatedHTML);
    } catch (error) {
      console.error('Error rendering blog with Puppeteer:', error);
      res.status(500).send('Failed to render blog dynamically.');
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
