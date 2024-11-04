const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlconnection');

const Employee = sequelize.define("Employee", {
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    companyId: { // Foreign key
        type: DataTypes.INTEGER,
        references: {
            model: 'Companies',
            key: 'id',
        }
    }
}, {
    timestamps: true,
});

//association
Employee.associate = (models) => {
    Employee.belongsTo(models.Company, { foreignKey: "companyId", as: "company" });
};

module.exports = Employee;
