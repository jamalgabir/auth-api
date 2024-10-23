require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per window
});
app.use(limiter);
// Middleware
app.use(express.json());
app.use(compression());

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined')); // or 'dev' for more detailed logs during development

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server error' });
});

app.use(helmet());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    
    
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
