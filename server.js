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

process.env.DEBUG = "puppeteer:*";  // Enables detailed logging for Puppeteer


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

    // ✅ Immediately return a placeholder response
    res.status(202).send(`
    <html>
      <head>
        <title>Loading...</title>
        <meta property="og:title" content="Loading blog post..." />
        <meta property="og:description" content="Fetching content..." />
        <meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg" />
      </head>
      <body>
        <h1>Loading blog post...</h1>
      </body>
    </html>
  `);

    // ✅ Run Puppeteer in the background (this will NOT block the response)
    (async () => {
      try {
        console.log("\n\nLaunching Puppeteer...\n\n");
        const browser = await puppeteer.launch({
          executablePath: process.env.NODE_ENV === "production"
            ? "/app/.apt/usr/bin/google-chrome"
            : undefined,
          headless: "new",
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
            "--disable-background-networking",
            "--disable-breakpad",
            "--disable-crash-reporter",
            "--disable-default-apps",
            "--disable-translate",
            "--disable-sync",
            "--disable-component-extensions-with-background-pages",
            "--remote-debugging-port=9222",
            "--disable-extensions",
            "--disable-software-rasterizer",
            "--single-process",
          ]
        });

        console.log("\n\nPuppeteer launched successfully.\n\n");
        const page = await browser.newPage();
        const blogUrl = `https://dieseldown.com/blog/${slug}`;
        await page.goto(blogUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

        console.log("\n\nFetching blog metadata from API...");
        const { data: blogData } = await axios.get(`https://api.dieseldown.com/api/blog/${slug}`);

        // Inject Open Graph meta tags
        await page.evaluate((blog) => {
          document.querySelectorAll('meta[property^="og:"]').forEach((meta) => meta.remove());
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
        await browser.close();

        console.log("\n\nUpdated HTML generated and ready.\n\n");

      } catch (error) {
        console.error('\n\nError rendering blog with Puppeteer:', error, "\n\n");
      }
    })(); // Run Puppeteer in the background
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
