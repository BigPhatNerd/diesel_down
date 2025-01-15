require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const blog = require('./routes/api/blog');
const jotFormWebhook = require('./routes/webhooks/jotform');

var cors = require('cors')
const app = express();
connectDB();


app.use((req, res, next) => {
  // Skip redirection for local development
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  // Redirect to HTTPS if not already secure
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});


//Init middleware
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/webhooks', jotFormWebhook);
app.use('/api/blog', blog);

app.get('/privacy-policy', (req, res) => {
  const filePath = path.join(__dirname, 'privacy-policy.html');

  // Debug the path
  console.log('Resolved filePath:', filePath);

  // Send the file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending privacy-policy.html:', err.message);
      res.status(500).send('Privacy Policy file not found.');
    }
  });
});

console.log({ dirname: __dirname })
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/blog/:slug', async (req, res) => {
    const slug = req.params.slug;
    console.log({ slug })
    // Fetch the blog post from your API or database
    const blog = await fetch(`https://api.dieseldown.com/blog/${slug}`).then((response) =>
      response.json()
    );

    // Read the index.html file
    const indexHTML = fs.readFileSync(path.resolve(__dirname, 'client', 'build', 'index.html'), 'utf8');

    // Replace placeholders with dynamic meta tags
    const updatedHTML = indexHTML
      .replace('<meta property="og:title" content="Diesel Down - Performance Diesel Data and Analytics" />', `<meta property="og:title" content="${blog.title}" />`)
      .replace('<meta property="og:description" content="Explore Diesel Down\'s professional diesel tuning services with our state-of-the-art Dynocom 15,000 Series Dyno!" />', `<meta property="og:description" content="${blog.excerpt}" />`)
      .replace('<meta property="og:image" content="https://dieseldown.com/profile_avatar.jpg" />', `<meta property="og:image" content="${blog.image}" />`)
      .replace('<meta property="og:url" content="https://dieseldown.com" />', `<meta property="og:url" content="https://dieseldown.com/blog/${slug}" />`);
    console.log({ updatedHTML })
    res.send(updatedHTML);
  });
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}



const PORT = process.env.PORT || 4390;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))