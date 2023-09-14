const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const paymentType = sequelize.define('paymentType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'payment_type',
    timestamps: false
});

module.exports = paymentType;