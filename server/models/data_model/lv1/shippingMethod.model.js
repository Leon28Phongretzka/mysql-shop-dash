const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const ShippingMethod = sequelize.define('ShippingMethod', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    tableName: 'shipping_method',
    timestamps: false
});

module.exports = ShippingMethod;