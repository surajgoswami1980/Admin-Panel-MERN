const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// require('dotenv').config();
require('dotenv').config({ path: './config.env' });



const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const DB = 'mongodb://127.0.0.1:27017/whitesoft';
const app = express();
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Allow specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add PUT here
  allowedHeaders: ['Content-Type', 'Authorization'], // Add headers if needed
}));

  console.log('JWT_SECRET:', process.env.JWT_SECRET);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/', authRoutes);
app.use('/', employeeRoutes);

app.listen(8088, () => console.log(`Server running on port 8088`));
