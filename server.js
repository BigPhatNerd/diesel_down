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
    console.log({ slug });

    try {
      // Launch Puppeteer
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });

      console.log("\n\n\n\n\nfiring away\n\n\n");
      const page = await browser.newPage();

      // Navigate to the blog page
      const blogUrl = `https://dieseldown.com/blog/${slug}`;
      console.log({ blogUrl });
      await page.goto(blogUrl, { waitUntil: 'networkidle0', timeout: 10000 });

      // Fetch blog metadata
      let blogData;
      try {
        const { data } = await axios.get(`https://api.dieseldown.com/api/blog/${slug}`);
        blogData = data;
      } catch (apiError) {
        console.error('Error fetching blog data:', apiError);
        blogData = null; // Ensure fallback handling
      }

      if (!blogData) {
        console.log("Blog data not found, using fallback meta tags.");
        return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta property="og:title" content="Diesel Down Blog">
          <meta property="og:description" content="Explore performance diesel insights at Diesel Down.">
          <meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg">
          <meta property="og:url" content="https://dieseldown.com/blog">
          <meta property="og:type" content="website">
          <meta property="fb:app_id" content="2028204197694958">
        </head>
        <body>
          <h1>Blog Post Not Found</h1>
          <p>The requested blog post is unavailable. Please check back later.</p>
        </body>
        </html>
      `);
      }

      // Inject Open Graph meta tags
      await page.evaluate((blog) => {
        const head = document.querySelector('head');
        const createMetaTag = (property, content) => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', property);
          meta.setAttribute('content', content);
          head.appendChild(meta);
        };

        createMetaTag('og:title', blog.Title);
        createMetaTag('og:description', blog.Content.substring(0, 150));
        createMetaTag('og:image', "https://dieseldown.com/profile_avatar.jpg");
        createMetaTag('og:url', `https://dieseldown.com/blog/${blog.slug}`);
        createMetaTag('og:type', 'article');
        createMetaTag('fb:app_id', '2028204197694958');
      }, blogData);

      // Get the updated HTML
      const updatedHTML = await page.content();
      await browser.close();

      res.send(updatedHTML);
    } catch (error) {
      console.error('Error rendering blog with Puppeteer:', error);

      // ✅ **Ensure a 200 response with a backup OG preview**
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta property="og:title" content="Diesel Down Blog">
        <meta property="og:description" content="Explore performance diesel insights at Diesel Down.">
        <meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg">
        <meta property="og:url" content="https://dieseldown.com/blog">
        <meta property="og:type" content="website">
        <meta property="fb:app_id" content="2028204197694958">
      </head>
      <body>
        <h1>Blog Page Unavailable</h1>
        <p>We are experiencing technical difficulties. Please check back later.</p>
      </body>
      </html>
    `);
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
