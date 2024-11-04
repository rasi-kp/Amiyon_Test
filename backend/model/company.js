const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlconnection');

const Company = sequelize.define("Company", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  logo: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING }
}, {
  timestamps: true,
});

// asociation
Company.associate = (models) => {
  Company.hasMany(models.Employee, { foreignKey: "companyId", as: "employees" });
};

module.exports = Company;
