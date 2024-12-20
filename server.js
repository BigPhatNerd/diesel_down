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
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}



const PORT = process.env.PORT || 4390;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))