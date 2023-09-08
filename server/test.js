const { Sequelize } = require('sequelize');
const config = require('./config/database.config'); 
require('dotenv').config();
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false
});  

console.log(sequelize)
// console.log(process.env.MYSQL_HOST)
