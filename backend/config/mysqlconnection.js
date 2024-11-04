const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Mysql Databas Connected ..........');
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
  }
})();

module.exports = sequelize;
