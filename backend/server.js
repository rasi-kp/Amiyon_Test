const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require("./config/mysqlconnection");
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
// Import models
const Company = require('./model/company');
const Employee = require('./model/employee');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static file available
app.use('/public', express.static(path.join(__dirname, 'public')));
// Define associations
const models = { Company, Employee };
Company.associate(models);
Employee.associate(models);

// Define routes
const userRouter = require("./routes/user");
const companyRouter = require("./routes/company");
const employeeRouter = require("./routes/employee");

app.use('/', userRouter);
app.use('/employee', employeeRouter);
app.use('/company', companyRouter);

// Sync databases
sequelize.sync()
    .then(() => {
        console.log('tables created Successfuly');
    })
    .catch((error) => console.error('Unable to connect to the database:', error));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
