const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'country',
    timestamps: false
});


module.exports = Country;