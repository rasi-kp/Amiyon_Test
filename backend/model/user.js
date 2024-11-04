const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlconnection');
const bcrypt = require('bcrypt');

// Define the Usr model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
});

User.beforeCreate(async user => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
