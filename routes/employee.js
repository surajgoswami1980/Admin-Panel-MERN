// routes/employees.js
const express = require('express');
const Employee = require('../model/Employee');
const auth = require('../middleware/auth');
const Joi = require('joi');

const router = express.Router();

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  designation: Joi.string().valid('HR', 'Manager', 'Sales').required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  course: Joi.string().required(),
  image: Joi.string(),
}).unknown(false);

router.post('/add', async (req, res) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const employee = new Employee(req.body);
  await employee.save();
  res.send(employee);
});

router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).send('Employee not found');
  res.send(employee);
});

router.put('/:id', async (req, res) => {
  const { _id,__v, ...updateFields } = req.body; // Strip `_id` from the payload

  const { error } = employeeSchema.validate(updateFields);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = await Employee.findByIdAndUpdate(req.params.id, updateFields);
  if (!employee) return res.status(404).send('Employee not found');
  res.send(employee);
});


router.delete('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).send('Employee not found');
  res.send({ message: 'Employee deleted' });
});

module.exports = router;
