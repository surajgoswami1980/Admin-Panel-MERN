// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Admin = require('../model/Admin');

const router = express.Router();
require('dotenv').config();

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).send('Username or Password is incorrect');

  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send('Invalid Password');

  const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.header('Authorization', token).send({ token: token });  // Ensure token is being sent back
});

module.exports = router;
