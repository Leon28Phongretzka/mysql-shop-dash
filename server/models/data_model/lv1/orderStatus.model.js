const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const orderStatus = sequelize.define('orderStatus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'order_status',
    timestamps: false
});

module.exports = orderStatus;