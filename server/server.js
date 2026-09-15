require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
const allowedOrigins = [
  process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : '*',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, '');
    if (cleanOrigin.endsWith('.vercel.app') || allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/ai', require('./routes/aiChat'));

app.get('/api/health', (req, res) => res.status(200).json({ success: true, message: 'Ramesh Portfolio API is running', timestamp: new Date().toISOString() }));

app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` }));
app.use((err, req, res, next) => res.status(err.status || 500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;

