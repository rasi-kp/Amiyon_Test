const express = require('express');
const router = express.Router();
const { auth } = require('../midleware/isAuthUser');
const { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controller/employee');

// Employee routes
router.post("/employees", auth, createEmployee);
router.get("/employees", auth, getAllEmployees);
router.get("/employees/:id", auth, getEmployeeById);
router.put("/employees/:id", auth, updateEmployee);
router.delete("/employees/:id", auth, deleteEmployee);


module.exports = router;
