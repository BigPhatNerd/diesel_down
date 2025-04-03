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

const geoip = require('geoip-lite');
// Enables detailed logging for Puppeteer


const cors = require('cors');
const app = express();
connectDB();

// Geo-block India
app.use((req, res, next) => {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket?.remoteAddress;
  console.log({ ip })
  // Lookup the geo location of the IP
  const geo = geoip.lookup(ip);

  // Block Indian traffic
  if (geo?.country === 'IN') {
    console.log(`Blocked request from India: IP ${ip}`);
    return res.status(403).send('Access denied');
  }

  next();
});

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

    // ✅ Detect if request is from a bot (Facebook, Twitter, etc.)
    const botUserAgents = [
      "facebookexternalhit",
      "Twitterbot",
      "LinkedInBot",
      "Googlebot",
      "bingbot",
      "Yahoo! Slurp",
      "Discordbot"
    ];
    const userAgent = req.headers["user-agent"] || "";
    const isBot = botUserAgents.some((bot) => userAgent.includes(bot));

    if (isBot) {
      // ✅ Fetch blog metadata for bots
      try {
        console.log("\n\nFetching blog metadata from API...");
        const { data: blogData } = await axios.get(`https://api.dieseldown.com/api/blog/${slug}`);

        if (!blogData) {
          console.error("\n\nERROR: Blog data is undefined or null\n\n");
          return res.status(404).send("Blog post not found.");
        }

        console.log("\n\nSuccessfully fetched blog data:\n", blogData);

        // ✅ Send static meta tags for social media
        return res.send(`
        <html>
          <head>
            <title>${blogData.Title}</title>
            <meta property="og:title" content="${blogData.Title}" />
            <meta property="og:description" content="${blogData.Content.substring(0, 150)}" />
            <meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg" />
            <meta property="og:url" content="https://dieseldown.com/blog/${blogData.slug}" />
            <meta property="og:type" content="article" />
            <meta property="fb:app_id" content="2028204197694958" />
          </head>
          <body>
            <h1>${blogData.Title}</h1>
            <p>${blogData.Content.substring(0, 150)}</p>
          </body>
        </html>
      `);
      } catch (error) {
        console.error('\n\nError rendering blog metadata:', error, "\n\n");
        return res.status(200).send(`
        <html>
          <head>
            <title>Blog Not Found</title>
            <meta property="og:title" content="Diesel Down Blog" />
            <meta property="og:description" content="Check out our latest blog posts at Diesel Down." />
            <meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg" />
            <meta property="og:url" content="https://dieseldown.com/blog" />
            <meta property="og:type" content="website" />
          </head>
          <body>
            <h1>Blog post not found.</h1>
          </body>
        </html>
      `);
      }
    }

    // ✅ If NOT a bot, serve React app (DO NOT REDIRECT)
    console.log("Normal user detected, serving React app.");
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
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
