require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const args = process.argv.slice(2);

const isLocal = args.includes('--local');

console.log('=============> ', { isLocal });

const app = express();

// Connect to database
connectDB();

// Allowed hosts
const allowedOrigin = [
  'http://localhost:3000',
  'http://localhost:3001'
];

// Middleware
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('*', (req, res, next) => {
  console.log('*'.repeat(50));
  console.log('URL:', req.originalUrl, req.method);
  if (req?.body) {
    console.log('Payload:', req.body);
  }
  console.log('*'.repeat(50));
  next();
})

// Routes
app.use('/api/content', require('./routes/contentRoutes'));

app.use('/api/user', require('./routes/userRoutes'));

app.use('/api/project', require('./routes/projectRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
