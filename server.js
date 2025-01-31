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

      console.log("\n\n\nLaunching Puppeteer\n\n\n");
      const page = await browser.newPage();

      // Navigate to the blog page
      const blogUrl = `https://dieseldown.com/blog/${slug}`;
      console.log({ blogUrl });

      await page.goto(blogUrl, { waitUntil: 'networkidle0', timeout: 10000 });

      // Fetch blog metadata
      console.log("\n\nFetching blog data...\n\n");
      const { data: blogData } = await axios.get(`https://api.dieseldown.com/api/blog/${slug}`);

      if (!blogData) throw new Error("Blog data is undefined or null");

      console.log("\n\nSuccessfully fetched blog data\n\n");

      // Inject Open Graph meta tags dynamically
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

      console.log("\n\nMeta tags injected successfully\n\n");

      // Get the updated HTML
      const updatedHTML = await page.content();
      await browser.close();

      console.log("\n\nSending updated HTML response\n\n");
      res.status(200).send(updatedHTML);

    } catch (error) {
      console.error('Error rendering blog with Puppeteer:', error);

      // Force a 200 response with error details
      res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta property="og:title" content="Error Loading Blog">
        <meta property="og:description" content="There was an issue loading this blog post. Please try again later.">
        <meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg">
        <meta property="og:url" content="https://dieseldown.com/blog">
        <meta property="og:type" content="website">
        <meta property="fb:app_id" content="2028204197694958">
      </head>
      <body>
        <h1>Blog Page Error</h1>
        <p>We are experiencing issues loading this blog post.</p>
        <pre>${error.message}</pre>
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
