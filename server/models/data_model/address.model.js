const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    unit_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address_line1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_line2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'address',
    timestamps: false
});
module.exports = Address;