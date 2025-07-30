require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));